using CatalogService.domain.entities;
using CatalogService.logic.services;
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


    // /api/products
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _productService.GetProductsAsync();
        return Ok(products);
    }

    // /api/products/search_name
    [HttpGet("{search_name}")]
    public async Task<IActionResult> GetProductByName(string search_name)
    {
        var products = await _productService.GetProductByNameAsync(search_name);
        return Ok(products);
    }
}
