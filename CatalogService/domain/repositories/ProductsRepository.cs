using CatalogService.domain.entities;
using CatalogService.domain.repositories.interfaces;

using Npgsql;

namespace CatalogService.domain.repositories
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly string _connectionString;

        // из appsettings.json
        public ProductsRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection")!;
        }


        //
        public async Task<Product?> GetProductByNameAsync(string searchQuery)
        {
            // соединение с БД
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            // SQL-команду
            await using var cmd = new NpgsqlCommand(
                @"SELECT productid, name, price
                FROM products
                WHERE Name
                LIKE @searchQuery",
                connection
            );

            // завводим в SQL переменную searchQuery
            cmd.Parameters.AddWithValue("@searchQuery", $"%{searchQuery}%");
            //

            // читаем результат
            await using var reader = await cmd.ExecuteReaderAsync();

            // если строка найдена
            if (await reader.ReadAsync())
            {
                return new Product
                {
                    productid = reader.GetInt32(0),
                    name = reader.GetString(1),
                    price = reader.GetDecimal(2)
                };
            }

            // Если не найдено
            return null;

        }


        //
        public async Task<List<Product>> GetProductsAsync(int limit, int offset)
        {
            var products = new List<Product>(); // 

            // Открываем соединение с БД
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            // Создаем SQL-команду
            await using var cmd = new NpgsqlCommand(
                @"SELECT productid, name, price 
                FROM products 
                ORDER BY productid 
                LIMIT @limit OFFSET @offset", // пагинация че где
                connection
            );

            // завводим в SQL переменные
            cmd.Parameters.AddWithValue("@limit", limit);
            cmd.Parameters.AddWithValue("@offset", offset);
            //

            // Выполняем и читаем результат
            await using var reader = await cmd.ExecuteReaderAsync();
            
            while (await reader.ReadAsync())
            {
                products.Add(new Product(
                    reader.GetInt32(0),
                    reader.GetString(1),
                    reader.GetDecimal(2)
                ));
            }

            return products;

        }
    }
}
