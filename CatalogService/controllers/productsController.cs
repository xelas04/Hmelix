using Microsoft.AspNetCore.Mvc;

namespace CatalogService.controllers;

[Route("/api/products")]
[ApiController]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
        {
            return Ok("products");
        }
}
