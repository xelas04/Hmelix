using UserService.domain.entities;
using UserService.dtos;

namespace UserService.logic.interfaces;

public interface ITokenService
{
    string GenerateToken(int userId);
}