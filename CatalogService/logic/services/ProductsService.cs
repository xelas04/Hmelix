using CatalogService.domain.entities;
using CatalogService.logic.services;

namespace CatalogService.logic.services
{
    public class ProductsService : IProductsService
    {

        private readonly IProductsRepository _repository;

        public ProductsService(IProductsRepository repository)
        {
            _repository = repository;
        }
        // внедряется зависимость, чтобы дойти до БД


        public async Task<List<Product>> GetProductsAsync()
        {
            var products = await _repository.GetProductsAsync();
            return products;
        }

        public async Task<Product?> GetProductByNameAsync(string search_name)
        {
            var product = await _repository.GetProductByNameAsync(search_name);
            return product;
        }
                
    }
}
