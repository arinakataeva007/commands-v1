using Commands_back.Data;
using Commands_back.Repositories;
using Commands_back.Models.interfaces;
using Commands_back.Services;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<Commands_back.Services.PasswordHasher>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://158.160.6.209:8080")
            .AllowAnyHeader()
            .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowFrontend");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.WebRootPath, "uploads")),
    RequestPath = "/uploads"
});
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();
