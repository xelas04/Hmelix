using UserService.domain.entities;
using UserService.dtos;

namespace UserService.domain.repositories.interfaces;

public interface IUserRepository
{
    public Task<User> UserRegistrationAsync(UserRegistrationDto userRegistrationDto); // registration

    public Task<User?> GetUserByEmailAsync(string email); // login

}
