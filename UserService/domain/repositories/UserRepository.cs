using Npgsql;
using System.Data;
using UserService.domain.entities;
using UserService.domain.repositories.interfaces;
using UserService.dtos;

namespace UserService.domain.repositories;

public class UserRepository : IUserRepository
{
    private string _connectionString;
    public UserRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection")!;
    } // для подключения к нужной БД

    // --- UserRegistration ---
    public async Task<User> UserRegistrationAsync(UserRegistrationDto userRegistrationDto)
    {
        // соединение с БД
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        // Создаем SQL-команду заполнения данных пользователя
        await using var cmd = new NpgsqlCommand(
            @"INSERT INTO users (""name"", ""email"", ""password"", ""sex"", ""dateOfBirth"")
              VALUES (@name, @email, @password, @sex, @dateOfBirth)
              RETURNING ""userId"";",
            connection
        );

        // завводим в SQL переменные
        cmd.Parameters.AddWithValue("@name", userRegistrationDto.name);
        cmd.Parameters.AddWithValue("@email", userRegistrationDto.email);
        cmd.Parameters.AddWithValue("@password", userRegistrationDto.password);
        cmd.Parameters.AddWithValue("@sex", userRegistrationDto.sex);
        cmd.Parameters.AddWithValue("@dateOfBirth", userRegistrationDto.dateOfBirth);

        // ExecuteScalarAsync — для одного значения (userId)
        int userId = (int)(await cmd.ExecuteScalarAsync())!;

        // Собираем и возвращаем User из dto + userId из БД
        return new User
        {
            userId = userId, // из БД
            name = userRegistrationDto.name, // из dto
            email = userRegistrationDto.email // из dto
        };
    }

    // --- UserLogin ---
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        // соединение с БД
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        // Создаем SQL-команду заполнения данных пользователя
        await using var cmd = new NpgsqlCommand(
            @"SELECT ""userId"", ""name"", ""email"", ""password"", ""sex"", ""dateOfBirth"" 
            FROM users 
            WHERE ""email"" = @email
            LIMIT 1 ;",
            connection
        );

        // завводим в SQL переменную
        cmd.Parameters.AddWithValue("@email", email);

        await using var reader = await cmd.ExecuteReaderAsync(); // извлекаем
        if (await reader.ReadAsync())
        {
            return new User
            {
                userId = reader.GetInt32(0),
                name = reader.GetString(1),
                email = reader.GetString(2),
                password = reader.GetString(3),
                sex = reader.GetString(4),
                dateOfBirth = reader.GetFieldValue<DateOnly>(5)
            };
        }

        return null;
    }

}
