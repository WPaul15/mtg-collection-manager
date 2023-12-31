// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod action_handler;
mod actions;
mod application_context;
mod collection_service;
mod commands;
mod model;
mod repository;
mod surreal_respository;

use action_handler::ActionDispatcher;
use application_context::ApplicationContext;
use collection_service::CollectionService;
use commands::{close_splash_screen, ipc_message};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use surreal_respository::SurrealRepository;

#[derive(Deserialize, Serialize)]
struct IpcMessage {
    domain: String,
    action: Value,
}

#[tokio::main]
async fn main() {
    let context = ApplicationContext::new().await;

    tauri::Builder::default()
        .manage(context)
        .invoke_handler(tauri::generate_handler![close_splash_screen, ipc_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
