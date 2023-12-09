use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CollectionEntry {
    pub card_id: String,
    pub num_regular: i32,
    pub num_foil: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Collection {
    pub _id: String,
    pub name: String,
    pub cards: Vec<CollectionEntry>,
}
