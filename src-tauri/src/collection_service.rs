use async_trait::async_trait;
use serde_json::Value;

use crate::{
    action_handler::{ActionDispatcher, ActionHandler},
    actions::collection_actions::{CollectionAction, CollectionDto, COLLECTION_DOMAIN},
    model::collection::Collection,
    repository::Repository,
};

pub struct CollectionService {
    repository: Box<dyn Repository<Collection> + Send + Sync>,
}

impl CollectionService {
    pub fn new(repository: Box<dyn Repository<Collection> + Send + Sync>) -> Self {
        Self { repository }
    }

    pub async fn create_collection(&self, name: &str) -> Collection {
        let id = uuid::Uuid::new_v4().to_string();
        let new_card_collection = self
            .repository
            .create(
                &id,
                Collection {
                    _id: id.clone(),
                    name: name.to_string(),
                    cards: vec![],
                },
            )
            .await;

        new_card_collection
    }

    pub async fn get_all_collections(&self) -> Vec<Collection> {
        self.repository.get_all().await
    }

    pub async fn get_collection_by_id(&self, id: &str) -> Option<Collection> {
        self.repository.get_by_id(id).await
    }

    pub async fn update_collection(&self, id: &str, new_name: &str) -> Collection {
        let mut card_collection = self.get_collection_by_id(id).await.unwrap();
        card_collection.name = new_name.to_string();
        let id = card_collection._id.clone();
        self.repository.update(&id, card_collection).await
    }

    pub async fn delete_collection_by_id(&self, id: &str) -> Collection {
        self.repository.delete(id).await
    }
}

#[async_trait]
impl ActionDispatcher for CollectionService {
    async fn dispatch(&self, domain: String, action: Value) -> Value {
        if domain == COLLECTION_DOMAIN {
            ActionHandler::<CollectionAction>::convert_and_handle(self, action).await
        } else {
            Value::Null
        }
    }
}

#[async_trait]
impl ActionHandler<CollectionAction> for CollectionService {
    async fn handle_action(&self, action: CollectionAction) -> CollectionAction {
        let response = match action {
            CollectionAction::CreateCollection(data) => {
                let card_collection = self.create_collection(&data.name).await;
                CollectionAction::CollectionCreated(CollectionDto {
                    id: card_collection._id,
                    name: card_collection.name,
                })
            }
            CollectionAction::GetAllCollections => {
                let card_collections = self.get_all_collections().await;

                CollectionAction::AllCollectionsRead(
                    card_collections
                        .into_iter()
                        .map(|c| CollectionDto {
                            id: c._id,
                            name: c.name,
                        })
                        .collect(),
                )
            }
            CollectionAction::UpdateCollection(data) => {
                let card_collection = self.update_collection(&data.id, &data.name).await;
                CollectionAction::CollectionUpdated(CollectionDto {
                    id: card_collection._id,
                    name: card_collection.name,
                })
            }
            CollectionAction::DeleteCollection(data) => {
                let deleted = self.delete_collection_by_id(&data.id).await;
                CollectionAction::CollectionDeleted(CollectionDto {
                    id: deleted._id,
                    name: deleted.name,
                })
            }
            _ => CollectionAction::UpdateCollectionError,
        };

        response
    }
}
