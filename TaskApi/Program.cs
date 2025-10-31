using TaskApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<TaskRepository>();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p =>
    {
        p.AllowAnyOrigin()
         .AllowAnyHeader()
         .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");
app.MapControllers();
app.Run("http://localhost:5000");