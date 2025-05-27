using Commands_back.Models.RequestModels;

namespace Commands_back.Models.interfaces;

public interface IUserService
{
    List<User> GetAllUsers();
    User GetUserById(Guid id);

    Guid CreatUser(CreateUserRequest request);

    User? UpdateUserInfo(UpdateUserRequest request);

    
    void DeleteUser(Guid id); 
    Guid CheckUserInfo(string email, string password);
    User GetUserByEmail(string email);
}
public interface IUserRepository
{
    List<User> GetAllUsers();
    User GetUserById(Guid id);

    Guid CreatUser(CreateUserRequest request);

    void DeleteUser(Guid id);

    User? UpdateUserInfo(UpdateUserRequest request);


    Guid CheckUserInfo(string email, string passwrd);
    
    User GetUserByEmail(string email);
}