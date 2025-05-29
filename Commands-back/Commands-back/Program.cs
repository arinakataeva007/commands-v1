using Commands_back.Data;
using Commands_back.Repositories;
using Commands_back.Models.interfaces;
using Commands_back.Services;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
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
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://158.160.6.209:8080")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

var app = builder.Build(); // app - готовое веб-приложение 
app.UseCors("AllowFrontend");
app.UseHttpsRedirection(); // включение https и маршрутизации
app.UseRouting(); // вкл систему маршрутизации
// ReSharper disable once InvalidXmlDocComment

/**
 * Включение свагера
 */
app.UseSwagger();
app.UseSwaggerUI();

// Говорит приложению обрабатывать запросы к API-контроллерам
app.MapControllers();

app.Run();