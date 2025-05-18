using Commands_back.Models;
using Commands_back.Repositories;
namespace Commands_back.Services;

public interface IUserService
{
    List<User> GetAllUsers();
    User GetUserById(Guid id);

    Guid CreatUser(string name, string email, string password, string? description, Guid[]? rolesId,
        string? pathIcon, Guid[]? projectId);

    User UpdateUserInfo(Guid id, string? name, string? email, string? password,
        string? description, Guid[]? rolesId,
        string? pathIcon, Guid[]? projectsId);

    
    void DeleteUser(Guid id); 
    Guid CheckUserInfo(string email, string password);
    User GetUserByEmail(string email);
}
public class UserService(IUserRepository userRepository): IUserService
{
    private readonly IUserRepository _userRepository = userRepository;
    
    public List<User> GetAllUsers()
    {
        return _userRepository.GetAllUsers();
    }

    public User GetUserById(Guid id)
    {
        return _userRepository.GetUserById(id);
    }

    public Guid CreatUser(string name, string email, string password, string? description, Guid[]? rolesId,
        string pathIcon, Guid[]? projectId)
    {
        return _userRepository.CreatUser(name, email, password, description, rolesId, pathIcon, projectId);
    }

    public User UpdateUserInfo(Guid id, string? name, string? email, string? password, string? description,
        Guid[]? rolesId, string? pathIcon, Guid[]? projectId)
    {
        return _userRepository.UpdateUserInfo(id, name, email, password, description, rolesId, pathIcon, projectId);
    }
    public void DeleteUser(Guid id)
    {
        _userRepository.DeleteUser(id);
    }
    
    public Guid CheckUserInfo(string email, string passwrd)
    {
        return _userRepository.CheckUserInfo(email, passwrd);
    }

    public User GetUserByEmail(string email)
    {
        return _userRepository.GetUserByEmail(email);
    }
}