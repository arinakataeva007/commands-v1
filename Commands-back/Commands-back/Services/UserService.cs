using Commands_back.Models;
using Commands_back.Repositories;
namespace Commands_back.Services;

public interface IUserService
{
    List<User> GetAllUsers();
    User GetUserById(Guid id);

    Guid CreatUser(string name, string email, string password, string description = "", Guid[] rolesId = null,
        string pathIcon = null);

    void UpdateUserInfo(Guid id, string name=null, string email=null, string password=null, string description = "", Guid[] rolesId = null,
        string pathIcon = null);
    
    void DeleteUser(Guid id); 
    Guid CheckUsernfo(string email, string passwrd);
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

    public Guid CreatUser(string name, string email, string password, string description = "", Guid[] rolesId = null,
        string pathIcon = null)
    {
        return _userRepository.CreatUser(name, email, password, description, rolesId, pathIcon);
    }

    public void UpdateUserInfo(Guid id, string name = null, string email = null, string password = null, string description = "",
        Guid[] rolesId = null, string pathIcon = null)
    {
        _userRepository.UpdateUserInfo(id, name, email, password, description, rolesId, pathIcon);
    }
    public void DeleteUser(Guid id)
    {
        _userRepository.DeleteUser(id);
    }
    
    public Guid CheckUsernfo(string email, string passwrd)
    {
        return _userRepository.CheckUsernfo(email, passwrd);
    }

    public User GetUserByEmail(string email)
    {
        return _userRepository.GetUserByEmail(email);
    }
}