using CatalogService.logic.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CatalogService.controllers;

[Route("/api/products")]
[ApiController]
public class ProductsController : ControllerBase
{

    private readonly IProductsService _productService;

    public ProductsController(IProductsService productService)
    {
        _productService = productService;
    }
    // внедряется зависимость, чтобы вызывать логику ProductsService

    // api/products
    [HttpGet]
    public async Task<IActionResult> GetProducts( // Здесь сразу пагинацию через query параметры
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        // валидация
        if (page < 1) return BadRequest("Неверно указан номер страницы");
        if (pageSize < 1) return BadRequest("Неверно указано количество строк");
        if (pageSize > 100) return BadRequest("Указано слишком большое количество строк");

        var products = await _productService.GetProductsAsync(page, pageSize);
        var totalCount = await _productService.GetTotalCountAsync();

        return Ok(new
        {
            products,
            totalCount
        });
    }

    // Лучше HttpPost /search. В body будет searchQuery

    [HttpPost("search")]
    public async Task<IActionResult> GetProductByName([FromBody] string searchQuery)
    {
        if (string.IsNullOrWhiteSpace(searchQuery))
            return BadRequest("searchQuery не может быть пустым");
        
        var products = await _productService.GetProductByNameAsync(searchQuery);

        return Ok(products);
    }
}
