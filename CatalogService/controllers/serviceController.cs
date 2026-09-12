using Microsoft.AspNetCore.Mvc;

[Route("/service")]
[ApiController]
public class ServiceController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok("service");
    }
}
