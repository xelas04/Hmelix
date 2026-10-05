using UserService.domain.entities;
using UserService.dtos;

namespace UserService.domain.repositories.interfaces;

public interface IUserRepository
{
    public Task<User> UserRegistrationAsync(UserRegistrationDto userRegistrationDto);

}
