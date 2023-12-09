use serde::{Deserialize, Serialize};
use strum_macros::Display;
use ts_rs::TS;

pub const COLLECTION_DOMAIN: &str = "collection";

#[derive(TS, Serialize, Deserialize)]
#[ts(export, rename_all = "camelCase")]
#[ts(export_to = "../src/bindings/CreateCollectionDto.ts")]
#[serde(rename_all(serialize = "camelCase", deserialize = "camelCase"))]
pub struct CreateCollectionDto {
    pub name: String,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export, rename_all = "camelCase")]
#[ts(export_to = "../src/bindings/DeleteCollectionDto.ts")]
#[serde(rename_all(serialize = "camelCase", deserialize = "camelCase"))]
pub struct DeleteCollectionDto {
    pub id: String,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export, rename_all = "camelCase")]
#[ts(export_to = "../src/bindings/CollectionDto.ts")]
#[serde(rename_all(serialize = "camelCase", deserialize = "camelCase"))]
pub struct CollectionDto {
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
pub enum CollectionAction {
    CreateCollection(CreateCollectionDto),
    CollectionCreated(CollectionDto),
    CreateCollectionError,
    GetAllCollections,
    AllCollectionsRead(Vec<CollectionDto>),
    GetAllCollectionsError,
    UpdateCollection(CollectionDto),
    CollectionUpdated(CollectionDto),
    UpdateCollectionError,
    DeleteCollection(DeleteCollectionDto),
    CollectionDeleted(CollectionDto),
    DeleteCollectionError,
}
