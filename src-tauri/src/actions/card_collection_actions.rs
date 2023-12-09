use serde::{Deserialize, Serialize};
use strum_macros::Display;
use ts_rs::TS;

pub const CARD_COLLECTION_DOMAIN: &str = "card_collection";

#[derive(TS, Serialize, Deserialize)]
#[ts(export, rename_all = "camelCase")]
#[ts(export_to = "../src/bindings/CreateCardCollectionDto.ts")]
#[serde(rename_all(serialize = "camelCase", deserialize = "camelCase"))]
pub struct CreateCardCollectionDto {
    pub name: String,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export, rename_all = "camelCase")]
#[ts(export_to = "../src/bindings/DeleteCardCollectionDto.ts")]
#[serde(rename_all(serialize = "camelCase", deserialize = "camelCase"))]
pub struct DeleteCardCollectionDto {
    pub id: String,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export, rename_all = "camelCase")]
#[ts(export_to = "../src/bindings/CardCollectionDto.ts")]
#[serde(rename_all(serialize = "camelCase", deserialize = "camelCase"))]
pub struct CardCollectionDto {
    pub id: String,
    pub name: String,
}

#[derive(Serialize, Deserialize, Display)]
#[serde(
    rename_all(serialize = "camelCase", deserialize = "camelCase"),
    tag = "type",
    content = "payload"
)]
#[strum(serialize_all = "camelCase")]
pub enum CardCollectionAction {
    CreateCollection(CreateCardCollectionDto),
    CardCollectionCreated(CardCollectionDto),
    GetAllCollections,
    AllCollectionsRead(Vec<CardCollectionDto>),
    UpdateCollection(CardCollectionDto),
    CardCollectionUpdated(CardCollectionDto),
    DeleteCollection(DeleteCardCollectionDto),
    CardCollectionDeleted(CardCollectionDto),
    UpdateCardCollectionError,
}
