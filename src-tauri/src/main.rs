// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod action_handler;
mod actions;
mod collection_service;
mod model;
mod repository;
mod surreal_respository;

use std::collections::HashMap;
use std::sync::Arc;

use action_handler::ActionDispatcher;
use collection_service::CollectionService;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use surreal_respository::SurrealRepository;
use surrealdb::engine::local::File;
use surrealdb::Surreal;
use tauri::State;

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
        let card_collection_service = Arc::new(CollectionService::new(repository));

        let mut action_dispatchers: HashMap<String, Arc<dyn ActionDispatcher + Sync + Send>> =
            HashMap::new();

        action_dispatchers.insert(
            actions::collection_actions::COLLECTION_DOMAIN.to_string(),
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
