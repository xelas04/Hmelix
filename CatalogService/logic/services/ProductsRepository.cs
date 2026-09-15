using CatalogService.domain.entities;

namespace CatalogService.logic.services
{
    public class ProductsRepository : IProductsRepository
    {
        public Task<Product?> GetProductByNameAsync(string search_name)
        {
            throw new NotImplementedException(); // запрос в базе
        }

        public Task<List<Product>> GetProductsAsync()
        {
            throw new NotImplementedException(); // запрос в базе
        }
    }
}
