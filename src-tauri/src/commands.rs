use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri::{Manager, State, Window};

use crate::ApplicationContext;

#[derive(Deserialize, Serialize)]
pub struct IpcMessage {
    domain: String,
    action: Value,
}

#[tauri::command]
pub async fn close_splash_screen(window: Window) {
    window
        .get_window("splash-screen")
        .expect("no window labeled 'splash-screen' found")
        .close()
        .unwrap();
    window
        .get_window("main")
        .expect("no window labeled 'main' found")
        .show()
        .unwrap();
}

#[tauri::command]
pub async fn ipc_message(
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
