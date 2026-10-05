namespace UserService.dtos;

public record UserLoginDto(
    string name, 
    string email, 
    string sex, 
    string dateOfBirth
);