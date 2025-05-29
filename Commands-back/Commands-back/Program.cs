using Commands_back.Data;
using Commands_back.Repositories;
using Commands_back.Models.interfaces;
using Commands_back.Services;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build(); // app - готовое веб-приложение 
// Добавляем сервисы API и Swagger
builder.Services.AddControllers(); // регистрирует сервисы для api-контроллеров
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddEndpointsApiExplorer(); // сканирует контроллеры и создает описание api в свагере
builder.Services.AddSwaggerGen(); // добавляет свагер
builder.Services.AddSingleton<Commands_back.Services.PasswordHasher>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://158.160.6.209:8080")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
app.UseCors(); 
app.UseRouting(); // вкл систему маршрутизации
app.UseHttpsRedirection(); // включение https и маршрутизации
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.WebRootPath, "uploads")),
    RequestPath = "/uploads"
});


// ReSharper disable once InvalidXmlDocComment

/**
 * Включение свагера
 */
app.UseSwagger();
app.UseSwaggerUI();

// Говорит приложению обрабатывать запросы к API-контроллерам
app.MapControllers();

app.Run();