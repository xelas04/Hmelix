using CatalogService.logic.services;

var builder = WebApplication.CreateBuilder(args); // инициализируем строителя приложений
//
builder.Services.AddControllers();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddScoped<IProductsService, ProductsService>();

var app = builder.Build(); // собираем приложение

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/", () => "gta7");

app.MapControllers();

app.Run();
