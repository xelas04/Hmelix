using UserService.domain.entities;
using UserService.domain.repositories.interfaces;
using UserService.dtos;
using UserService.logic.interfaces;

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

        // маппим в DTO
        return new UserResponseDto(user.userId, user.name, user.email, user.sex, user.dateOfBirth);
    }

    public async Task<UserResponseDto?> UserLoginAsync(UserLoginDto userLoginDto)
    {
        // Ищем пользователя по email
        var user = await _userRepository.GetUserByEmailAsync(userLoginDto.email);
        if (user is null) return null;

        // проверяем пароль
        if (user.password != userLoginDto.password) return null;

        // маппим в DTO
        return new UserResponseDto(user.userId, user.name, user.email, user.sex, user.dateOfBirth);
    }

    public async Task<UserResponseDto?> GetUserByIdAsync(int userId)
    {
        // идём в репозиторий за сущностью
        var user = await _userRepository.GetUserByIdAsync(userId);

        // если не нашли — null. Контроллер вернёт 404
        if (user is null) return null;

        // маппинг: entity → DTO. Только разрешённые поля
        return new UserResponseDto(user.userId, user.name, user.email, user.sex, user.dateOfBirth);
    }
}
