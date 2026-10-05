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

    public async Task<UserResponseDto?> UserLoginAsync(UserLoginDto userLoginDto)
    {
        // Ищем пользователя по email
        var user = await _userRepository.GetUserByEmailAsync(userLoginDto.email);
        if (user is null) return null;

        // проверяем пароль
        if (user.password != userLoginDto.password) return null;

        // маппим в DTO
        return new UserResponseDto(user.userId, user.name, user.email);
    }
}
