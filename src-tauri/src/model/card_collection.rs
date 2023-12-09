use bonsaidb::core::schema::Collection;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CardCollectionEntry {
    pub card_id: String,
    pub num_regular: i32,
    pub num_foil: i32,
}

#[derive(Debug, Serialize, Deserialize, Collection)]
#[collection(name = "collections", primary_key = String)]
pub struct CardCollection {
    pub _id: String,
    pub name: String,
    pub cards: Vec<CardCollectionEntry>,
}
