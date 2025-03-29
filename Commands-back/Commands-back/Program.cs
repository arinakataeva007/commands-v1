using Commands_back.Data;
using Commands_back.Repositories;
using Commands_back.Services;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Добавляем сервисы API и Swagger
builder.Services.AddControllers(); // регистрирует сервисы для api-контроллеров
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddEndpointsApiExplorer(); // сканирует контроллеры и создает описание api в свагере
builder.Services.AddSwaggerGen(); // добавляет свагер

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build(); // app - готовое веб-приложение 

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