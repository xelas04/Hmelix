namespace UserService.dtos;

// модель обьекта, который будет возвращать метод регистрации

public record UserResponseDto(
    int userId,
    string name, 
    string email
);
