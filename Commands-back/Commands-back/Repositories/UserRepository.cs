using Commands_back.Models;
using Commands_back.Data;
namespace Commands_back.Repositories;

public interface IUserRepository
{
    List<User> GetAllUsers();
    User GetUserById(Guid id);

    Guid CreatUser(string name, string email, string password, string description = "", Guid[] rolesId = null,
        string pathIcon = null);

    void DeleteUser(Guid id);

    void UpdateUserInfo(Guid id, string name = null, string email = null, string password = null,
        string description = "", Guid[] rolesId = null,
        string pathIcon = null);

    Guid CheckUsernfo(string email, string passwrd);
    
    User GetUserByEmail(string email);
}
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

    public Guid CreatUser(string name, string email, string password, string description = "", Guid[] rolesId = null,
        string pathIcon = "")
    {
        var newUser = new User
        {
            UserId = Guid.NewGuid(),
            UserName = name,
            Email = email,
            Password = password,
            Description = description,
            UserIconUrl = pathIcon,
            RolesId = rolesId,
        };
        _context.Users.Add(newUser);
        _context.SaveChanges();
        return newUser.UserId;
    }

    public void UpdateUserInfo(Guid id, string name = null, string email = null, string password = null, string description = "", Guid[] rolesId = null, string pathIcon = null)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserId == id);
        if (user == null) return;

        if (!string.IsNullOrEmpty(name)) user.UserName = name;
        if (!string.IsNullOrEmpty(email)) user.Email = email;
        if (!string.IsNullOrEmpty(password)) user.Password = password;
        if (!string.IsNullOrEmpty(description) && description != "") user.Description = description;
        if (!string.IsNullOrEmpty(pathIcon)) user.UserIconUrl = pathIcon;

        _context.Users.Update(user);
        _context.SaveChanges();
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

    public Guid CheckUsernfo(string email, string passwrd)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == email && u.Password == passwrd);
        if (user == null)
        {
            throw new InvalidOperationException($"Данные введен неверно");
        }
        return user.UserId;
    }

    public User GetUserByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }
}