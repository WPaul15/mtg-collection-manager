use async_trait::async_trait;
use bonsaidb::{
    core::schema::{Collection, SerializedCollection},
    local::AsyncDatabase,
};
use std::marker::PhantomData;

use crate::repository::Repository;

pub struct BonsaiRepository<TData> {
    db: Box<AsyncDatabase>,
    phantom: PhantomData<TData>,
}

impl<'a, TData> BonsaiRepository<TData>
where
    TData: SerializedCollection<Contents = TData>
        + Collection<PrimaryKey = String>
        + 'static
        + std::marker::Unpin,
{
    pub fn new(db: Box<AsyncDatabase>) -> Self {
        Self {
            db,
            phantom: PhantomData,
        }
    }
}

#[async_trait]
impl<'a, TData> Repository<TData> for BonsaiRepository<TData>
where
    TData: SerializedCollection<Contents = TData>
        + Collection<PrimaryKey = String>
        + 'static
        + std::marker::Unpin
        + std::fmt::Debug,
{
    async fn query_all(&self) -> Vec<TData> {
        let result_documents = TData::all_async(self.db.as_ref()).await.unwrap();
        let result_entities: Vec<_> = result_documents.into_iter().map(|f| f.contents).collect();
        result_entities
    }

    async fn query_by_id(&self, id: &str) -> Option<TData> {
        let document = TData::get_async(&id, self.db.as_ref())
            .await
            .unwrap()
            .unwrap();
        Some(document.contents)
    }

    async fn insert(&self, id: &str, data: TData) -> TData {
        let new_document = data.push_into_async(self.db.as_ref()).await.unwrap();
        new_document.contents
    }

    async fn update(&self, id: &str, data: TData) -> TData {
        let updated_document = TData::overwrite_async(&id, data, self.db.as_ref())
            .await
            .unwrap();
        updated_document.contents
    }
}
