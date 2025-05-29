using Commands_back.Models;
using Commands_back.Models.interfaces;
using Commands_back.Models.RequestModels;

namespace Commands_back.Services;
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

    public Guid CreatUser(CreateUserRequest request)
    {
        return _userRepository.CreatUser(request);
    }

    public User? UpdateUserInfo(UpdateUserRequest request)
    {
        return _userRepository.UpdateUserInfo(request);
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

    public string UploadUserImage(Guid id, IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            throw new ArgumentException("Photo is required");
        }

        // Проверяем тип файла (можно добавить другие проверки)
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var fileExtension = Path.GetExtension(file.FileName).ToLower();
        if (!allowedExtensions.Contains(fileExtension))
        {
            throw new ArgumentException("Invalid file type. Only image files are allowed.");
        }

        return _userRepository.UploadUserImage(id, file);
    }
}