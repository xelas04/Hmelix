using CatalogService.domain.entities;

namespace CatalogService.domain.repositories.interfaces
{
    public interface IProductsRepository
    {
        // медоты под запросы в БД
        public Task<List<Product>> GetProductsAsync(int limit, int offset);

        public Task<Product?> GetProductByNameAsync(string searchQuery);

        public Task<int> GetTotalCountAsync();

    }
}