using UserService.dtos;

namespace UserService.logic.interfaces;

public interface IUserService
{
    public Task<UserResponseDto> UserRegistrationAsync(UserRegistrationDto userRegistrationDto);
}
