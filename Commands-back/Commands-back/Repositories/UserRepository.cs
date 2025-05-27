using Commands_back.Models;
using Commands_back.Models.interfaces;
using Commands_back.Data;
using Commands_back.Models.RequestModels;

namespace Commands_back.Repositories;

public class UserRepository(AppDbContext context) : IUserRepository
{
    private readonly AppDbContext _context = context;
    public List<User> GetAllUsers()
    {
        return _context.Users.ToList();
    }

    public User GetUserById(Guid id)
    {
        return _context.Users.FirstOrDefault(user => user.UserId == id) ?? throw new InvalidOperationException();
    }
    
    public Guid CreatUser(CreateUserRequest request)
    {
        var newUser = new User
        {
            UserId = Guid.NewGuid(),
            UserName = request.Name,
            Email = request.Email,
            Password = request.Password,
            Description = request.Description,
            UserIconUrl = request.UserIconUrl,
            RolesId = request.RolesId,
            ProjectsId = request.ProjectsId
        };
        _context.Users.Add(newUser);
        _context.SaveChanges();
        return newUser.UserId;
    }

    public void DeleteUser(Guid id)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserId == id);

        if (user == null)
        {
            throw new InvalidOperationException($"Пользователь с ID {id} не найден.");
        }

        _context.Users.Remove(user);
        _context.SaveChanges();
    }

    public Guid CheckUserInfo(string email, string passwrd)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == email && u.Password == passwrd);
        if (user == null)
        {
            throw new InvalidOperationException($"Данные введены неверно");
        }
        return user.UserId;
    }

    public User? UpdateUserInfo(UpdateUserRequest request)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserId == request.UserId);
        if (user == null)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(request.UserName)) user.UserName = request.UserName;
        if (!string.IsNullOrWhiteSpace(request.Email)) user.Email = request.Email;
        if (!string.IsNullOrWhiteSpace(request.Password)) user.Password = request.Password;
        if (!string.IsNullOrWhiteSpace(request.Description)) user.Description = request.Description;
        if (request.RolesId != null && request.RolesId.Length > 0) user.RolesId = request.RolesId;
        if (!string.IsNullOrWhiteSpace(request.UserIconUrl)) user.UserIconUrl = request.UserIconUrl;
        if (request.ProjectsId != null && request.ProjectsId.Length > 0) user.ProjectsId = request.ProjectsId;

        _context.Users.Update(user);
        _context.SaveChanges();

        return user;
    }



    public User GetUserByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }
}