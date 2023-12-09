use async_trait::async_trait;

#[async_trait]
pub trait Repository<TEntity> {
    async fn query_all(&self) -> Vec<TEntity>;
    async fn query_by_id(&self, id: &str) -> Option<TEntity>;
    async fn insert(&self, id: &str, data: TEntity) -> TEntity;
    async fn update(&self, id: &str, data: TEntity) -> TEntity;
    async fn delete(&self, id: &str) -> TEntity;
}
