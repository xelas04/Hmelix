using CatalogService.domain.repositories;
using CatalogService.domain.repositories.interfaces;
using CatalogService.logic.interfaces;
using CatalogService.logic.services;

var builder = WebApplication.CreateBuilder(args);

// билдим слои
builder.Services.AddControllers();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddScoped<IProductsService, ProductsService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/", () => "Catalog service");

app.MapControllers();

app.Run();
