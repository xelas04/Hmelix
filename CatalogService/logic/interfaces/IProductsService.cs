using CatalogService.domain.entities;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CatalogService.logic.interfaces
{
    public interface IProductsService
    {
        public Task<List<Product>> GetProductsAsync(int page, int pageSize);

        public Task<Product?> GetProductByNameAsync(string searchQuery);
        
    }
}
