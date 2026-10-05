namespace UserService.logic.interfaces;

public interface ITokenService
{
    string GenerateToken(int userId);
}