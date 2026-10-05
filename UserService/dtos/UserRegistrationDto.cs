namespace UserService.dtos;

// модель обьекта, который принимает метод регистрации

public record UserRegistrationDto(
    string name, 
    string email, 
    string password,
    string sex, 
    DateOnly dateOfBirth
);
