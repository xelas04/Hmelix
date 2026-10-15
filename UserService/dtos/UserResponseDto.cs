namespace UserService.dtos;

// модель обьекта, который возвращают методы

public record UserResponseDto(
    int userId,
    string name, 
    string email,
    string? sex,
    DateOnly? dateOfBirth
);
