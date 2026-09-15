using CatalogService.domain.entities;

namespace CatalogService.logic.services
{
    public interface IProductsRepository
    {
        // медоты под запросы в БД
        public Task<List<Product>> GetProductsAsync();

        public Task<Product?> GetProductByNameAsync(string search_name);

    }
}