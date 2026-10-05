using UserService.dtos;
using UserService.logic.interfaces;
using UserService.domain.repositories.interfaces;

namespace UserService.logic.services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    } // DI

    public async Task<UserResponseDto> UserRegistrationAsync(UserRegistrationDto userRegistrationDto) // метод регистрации
    {
        var user = await _userRepository.UserRegistrationAsync(userRegistrationDto); // перенаправляем DTO в репозиторий

        return new UserResponseDto( //  процесс маппинга (преобразования) данных
            user.userId,
            user.name,
            user.email
        );
    }
}
