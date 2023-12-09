use async_trait::async_trait;
use serde::{de::DeserializeOwned, Serialize};
use serde_json::Value;

#[async_trait]
pub trait ActionDispatcher {
    async fn dispatch(&self, domain: String, action: Value) -> Value;
}

#[async_trait]
pub trait ActionHandler<T: DeserializeOwned + Serialize + std::fmt::Display + Send> {
    async fn convert_and_handle(&self, action: Value) -> Value {
        let incoming: T = serde_json::from_value(action).unwrap();
        let response: T = self.handle_action(incoming).await;
        let response_json: Value = serde_json::to_value(response).unwrap();
        response_json
    }

    async fn handle_action(&self, action: T) -> T;
}
