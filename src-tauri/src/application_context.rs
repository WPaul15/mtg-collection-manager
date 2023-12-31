use std::collections::HashMap;
use std::sync::Arc;

use crate::actions;
use crate::ActionDispatcher;
use crate::CollectionService;
use crate::SurrealRepository;
use surrealdb::engine::local::File;
use surrealdb::Surreal;

pub struct ApplicationContext {
    pub action_dispatchers: HashMap<String, Arc<dyn ActionDispatcher + Sync + Send>>,
}

impl ApplicationContext {
    pub async fn new() -> Self {
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
