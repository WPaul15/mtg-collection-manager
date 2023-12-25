use async_trait::async_trait;

#[async_trait]
pub trait Repository<TEntity> {
    async fn create(&self, id: &str, data: TEntity) -> TEntity;
    async fn get_all(&self) -> Vec<TEntity>;
    async fn get_by_id(&self, id: &str) -> Option<TEntity>;
    async fn update(&self, id: &str, data: TEntity) -> TEntity;
    async fn delete(&self, id: &str) -> TEntity;
}
