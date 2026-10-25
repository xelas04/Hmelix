namespace UserService.dtos;

// модель обьекта

public record UserLoginDto(
    string email,
    string password
);
