using CatalogService.domain.entities;

namespace CatalogService.logic.interfaces
{
    public interface IProductsService
    {
        public Task<List<Product>> GetProductsAsync(int page, int pageSize);

        public Task<Product?> GetProductByNameAsync(string searchQuery);

        public Task<int> GetTotalCountAsync();

        public Task<List<Product>> GetPopularAsync(int page, int pageSize);
    }
}
