using Microsoft.AspNetCore.Mvc;

namespace CatalogService.controllers
{
    [Route("/service")]
    [ApiController]
    public class serviceController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok("service");
        }
    }
}
