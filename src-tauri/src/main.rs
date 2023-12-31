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
use surreal_respository::SurrealRepository;
use tauri::Manager;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![close_splash_screen, ipc_message])
        .setup(|app| {
            let handle = app.handle();

            tauri::async_runtime::spawn(async move {
                let context = ApplicationContext::new().await;
                handle.manage(context);
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
