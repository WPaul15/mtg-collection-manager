use async_trait::async_trait;
use serde_json::Value;

use crate::{
    action_handler::{ActionDispatcher, ActionHandler},
    actions::card_collection_actions::{
        CardCollectionAction, CardCollectionDto, CARD_COLLECTION_DOMAIN,
    },
    model::card_collection::CardCollection,
    repository::Repository,
};

pub struct CardCollectionService {
    repository: Box<dyn Repository<CardCollection> + Send + Sync>,
}

impl CardCollectionService {
    pub fn new(repository: Box<dyn Repository<CardCollection> + Send + Sync>) -> Self {
        Self { repository }
    }

    pub async fn create_new_collection(&self, name: &str) -> CardCollection {
        let id = uuid::Uuid::new_v4().to_string();
        let new_card_collection = self
            .repository
            .insert(
                &id,
                CardCollection {
                    _id: id.clone(),
                    name: name.to_string(),
                    cards: vec![],
                },
            )
            .await;

        new_card_collection
    }

    pub async fn get_collection_by_id(&self, id: &str) -> Option<CardCollection> {
        self.repository.query_by_id(id).await
    }

    pub async fn update_collection_name(&self, id: &str, name: String) -> CardCollection {
        let mut card_collection = self.repository.query_by_id(id).await.unwrap();
        card_collection.name = name;
        let id = card_collection._id.clone();
        self.repository.update(&id, card_collection).await
    }
}

#[async_trait]
impl ActionDispatcher for CardCollectionService {
    async fn dispatch(&self, domain: String, action: Value) -> Value {
        if domain == CARD_COLLECTION_DOMAIN {
            ActionHandler::<CardCollectionAction>::convert_and_handle(self, action).await
        } else {
            Value::Null
        }
    }
}

#[async_trait]
impl ActionHandler<CardCollectionAction> for CardCollectionService {
    async fn handle_action(&self, action: CardCollectionAction) -> CardCollectionAction {
        let response = match action {
            CardCollectionAction::UpdateCollection(data) => {
                let card_collection = self.update_collection_name(&data.id, data.name).await;
                CardCollectionAction::CardCollectionUpdated(CardCollectionDto {
                    id: card_collection._id,
                    name: card_collection.name,
                })
            }
            CardCollectionAction::CreateCollection(data) => {
                let card_collection = self.create_new_collection(&data.name).await;
                CardCollectionAction::CardCollectionCreated(CardCollectionDto {
                    id: card_collection._id,
                    name: card_collection.name,
                })
            }
            _ => CardCollectionAction::UpdateCardCollectionError,
        };

        response
    }
}
