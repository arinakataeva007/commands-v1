using Commands_back.Models.ResponceModels;
using Commands_back.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Commands_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IUserService userService, PasswordHasher passwordHasher) : ControllerBase
    {
        private readonly IUserService _userService = userService;
        private readonly PasswordHasher _hasher = passwordHasher;

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(Guid id)
        {
            var user = _userService.GetUserById(id);
            return Ok(user);
        }
        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserResponce request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest("Имя и Почта должны быть заполнены");
            }
            
            var hashedPassword = _hasher.HashPassword(new Models.User{Password = request.Password, Email = request.Email,UserName = request.Name}, request.Password);
            var userId = _userService.CreatUser(request.Name, request.Email, hashedPassword, request.Description, request.RolesId, request.PathIcon);
            return CreatedAtAction(nameof(GetUserById), new { id = userId }, new { id = userId });
        }

        [HttpDelete]
        public void DeleteUser(Guid id)
        {
            _userService.DeleteUser(id);
        }

        [HttpPost("login")]
        public IActionResult CheckUserInfo([FromBody] CheckUsernfoResponce request)
        {
            var user = _userService.GetUserByEmail(request.Email);
            if (user == null)
            {
                return Unauthorized("Пользователь не найден");
            }

            var passwordValid = _hasher.VerifyPassword(user, request.Password);
            if (!passwordValid)
            {
                return Unauthorized("Неверный пароль");
            }

            return Ok(new { uid = user.UserId });
        }
    }
}