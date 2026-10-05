using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserService.dtos;
using UserService.logic.interfaces;

namespace UserService.controllers;

[Route("/api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;
    public UserController(IUserService userService, ITokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }

    // ---POST-api/user/registation---
    [HttpPost("registration")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationDto userRegistrationDto)
    {
        var response = await _userService.UserRegistrationAsync(userRegistrationDto);

        // Генерируем токен
        var token = _tokenService.GenerateToken(response.userId);

        // Ставим cookie с токеном
        Response.Cookies.Append("access_token", token, new CookieOptions
        {
            HttpOnly = true,     // JS не видит — защита от XSS
            Secure = true,       // только HTTPS
            SameSite = SameSiteMode.Strict,  // защита от CSRF
            Expires = DateTime.UtcNow.AddDays(7)
        });

        // Возвращаем ответ
        return Ok(response);
    }

    //---GET-api/user/me---
    [Authorize] // только после успешной авторизации:
    [HttpGet("me")]
    public IActionResult GetMe()
    {
        var userId = User.FindFirst("userId")?.Value;
        return Ok(new { userId });
    }

}
