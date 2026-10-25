using UserService.logic.interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserService.dtos;

namespace UserService.logic.services;

public class TokenService : ITokenService
{
    private readonly string _secretKey;
    public TokenService(IConfiguration config)
    {
        _secretKey = config["Jwt:SecretKey"]!;
    }

    public string GenerateToken(int userId)
    {
        var claims = new[] // создание полезных данных внутри токена, которые бэкэнд сможет прочитать при следующем запросе
        {
            new Claim("userId", userId.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken( // собираем токен
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1), // время жизни токена в сутках
            signingCredentials: creds); // криптографическая подпись

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}