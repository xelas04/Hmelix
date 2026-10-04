var builder = WebApplication.CreateBuilder(args);

// билдим слои
builder.Services.AddControllers();


var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/", () => "User service");

app.MapControllers();

app.Run();
