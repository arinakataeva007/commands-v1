using Commands_back.Models.ResponseModels;
using Commands_back.Models.interfaces;
using Commands_back.Models.RequestModels;
using Commands_back.Services;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult CreateUser([FromBody] CreateUserResponse request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest("Имя и Почта должны быть заполнены");
            }
            var hashedPassword = _hasher.HashPassword(new Models.User{Password = request.Password, Email = request.Email,UserName = request.Name}, request.Password);
            var requestUser = new CreateUserRequest
            {
                Name = request.Name,
                Email = request.Email,
                Password = hashedPassword,
                RolesId = request.RolesId,
                Description = request.Description,
                UserIconUrl = request.UserIconUrl,
                ProjectsId = request.ProjectsId

            };
            var userId = _userService.CreatUser(requestUser);
            return CreatedAtAction(nameof(GetUserById), new { id = userId }, new { id = userId });
        }

        [HttpDelete]
        public void DeleteUser(Guid id)
        {
            _userService.DeleteUser(id);
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateUser(Guid id, [FromBody] UpdateUserResponse Response)
        {
            var updatedUser = new UpdateUserRequest
            {
                UserId = id,
                RolesId = Response.RolesId,
                Description = Response.Description,
                UserIconUrl = Response.UserIconUrl,
                ProjectsId = Response.ProjectsId,
                Password = Response.Password,
                Email = Response.Email,
                UserName = Response.UserName
            };
            var result = _userService.UpdateUserInfo(
                updatedUser
            );

            if (result == null)
                return NotFound(new { message = "Пользователь не найден или обновление не удалось" });

            return Ok(result);
        }
        
        [HttpPost("login")]
        public IActionResult CheckUserInfo([FromBody] CheckUserInfoResponse request)
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