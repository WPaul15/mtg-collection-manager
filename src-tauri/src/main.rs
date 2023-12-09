// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod action_handler;
mod actions;
mod card_collection_service;
mod model;
mod repository;
mod surreal_respository;

use std::collections::HashMap;
use std::sync::Arc;

use action_handler::ActionDispatcher;
use card_collection_service::CardCollectionService;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use surreal_respository::SurrealRepository;
use surrealdb::engine::local::File;
use surrealdb::Surreal;
use tauri::{AppHandle, State};

#[derive(Deserialize, Serialize)]
struct IpcMessage {
    domain: String,
    action: Value,
}

struct ApplicationContext {
    action_dispatchers: HashMap<String, Arc<dyn ActionDispatcher + Sync + Send>>,
}

impl ApplicationContext {
    async fn new() -> Self {
        let db = Surreal::new::<File>("testdb/surreal_test.db")
            .await
            .unwrap();
        db.use_ns("mtg_collection_manager_ns")
            .use_db("mtg_collection_manager_db")
            .await
            .unwrap();

        let repository = Box::new(SurrealRepository::new(Box::new(db), "collections"));
        let card_collection_service = Arc::new(CardCollectionService::new(repository));

        let mut action_dispatchers: HashMap<String, Arc<dyn ActionDispatcher + Sync + Send>> =
            HashMap::new();

        action_dispatchers.insert(
            actions::card_collection_actions::CARD_COLLECTION_DOMAIN.to_string(),
            card_collection_service.clone(),
        );

        Self { action_dispatchers }
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn ipc_message(
    message: IpcMessage,
    context: State<'_, ApplicationContext>,
) -> Result<IpcMessage, ()> {
    let dispatcher = context.action_dispatchers.get(&message.domain).unwrap();
    let response = dispatcher
        .dispatch(message.domain.to_string(), message.action)
        .await;

    Ok(IpcMessage {
        domain: message.domain,
        action: response,
    })
}

#[tokio::main]
async fn main() {
    let context = ApplicationContext::new().await;

    tauri::Builder::default()
        .manage(context)
        .invoke_handler(tauri::generate_handler![ipc_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/*
CardCollectionEntry {
    card_id: "098c976b-6096-4ac7-8d52-2f219ae21d1f".to_string(),
    num_regular: 0,
    num_foil: 1,
},
CardCollectionEntry {
    card_id: "ba16bfb3-dbd3-4b3a-b155-08b613268d57".to_string(),
    num_regular: 0,
    num_foil: 1,
},
 */
