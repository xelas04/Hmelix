using CatalogService.domain.entities;

namespace CatalogService.logic.services
{
    public interface IProductsService
    {
        public Task<List<Product>> GetProductsAsync();

        public Task<Product?> GetProductByNameAsync(string search_name);
        
    }
}
