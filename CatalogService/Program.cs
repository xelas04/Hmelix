var builder = WebApplication.CreateBuilder(args); // инициализируем строителя приложений

builder.Services.AddControllers(); // добавляем контроллеры

var app = builder.Build(); // собираем приложение

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/", () => "gta7");

app.MapControllers();

// запускаем
app.Run();
