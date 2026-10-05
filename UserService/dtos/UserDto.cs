namespace UserService.dtos;

public record UserDto(
    int userId, 
    string name, 
    string email, 
    string password, 
    string sex, 
    string dateOfBirth
);