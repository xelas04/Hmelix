using Microsoft.AspNetCore.Mvc;

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
