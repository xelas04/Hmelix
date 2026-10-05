using UserService.domain.entities;
using UserService.dtos;

namespace UserService.logic.interfaces;

public interface IUserService
{
    public Task<UserResponseDto> UserRegistrationAsync(UserRegistrationDto userRegistrationDto); // registrarion

    public Task<UserResponseDto?> UserLoginAsync(UserLoginDto userLoginDto); // login
}
