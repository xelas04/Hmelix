namespace UserService.domain.entities;

// модель обьекта в БД

public class User
{
    public int userId { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string sex { get; set; }
    public DateOnly dateOfBirth { get; set; }
}
