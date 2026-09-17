using CatalogService.domain.entities;
using CatalogService.domain.repositories.interfaces;
using CatalogService.logic.interfaces;

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


        public async Task<List<Product>> GetProductsAsync(int page, int pageSize)
        {
            var offset = (page - 1) * pageSize;
            var products = await _repository.GetProductsAsync(pageSize, offset);
            return products;
        }


        public async Task<Product?> GetProductByNameAsync(string searchQuery)
        {
            var product = await _repository.GetProductByNameAsync(searchQuery);
            return product;
        }


        public Task<int> GetTotalCountAsync()
        {
            return _repository.GetTotalCountAsync();
        }

    }
}
