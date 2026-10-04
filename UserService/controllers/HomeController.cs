using Microsoft.AspNetCore.Mvc;

namespace UserService.controllers;

[Route("/api/user")]
[ApiController]
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
