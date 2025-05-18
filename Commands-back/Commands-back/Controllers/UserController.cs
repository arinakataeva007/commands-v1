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
            var userId = _userService.CreatUser(request.Name, request.Email, hashedPassword, request.Description, request.RolesId, request.UserIconUrl, request.ProjectsId);
            return CreatedAtAction(nameof(GetUserById), new { id = userId }, new { id = userId });
        }

        [HttpDelete]
        public void DeleteUser(Guid id)
        {
            _userService.DeleteUser(id);
        }
    
        // [HttpPut("{id}")]
        // public void UpdateUserInfo([FromBody] UpdateUserResponce request)
        // {
        //     _userService.UpdateUserInfo(request.UserId, request.UserName, request.Email, request.Password,
        //         request.Description, request.RolesId, request.UserIconUrl, request.ProjectsId);
        // }
        [HttpPut("{id}")]
        public IActionResult UpdateUser(Guid id, [FromBody] UpdateUserResponce dto)
        {
            try
            {
                var updatedUser = _userService.UpdateUserInfo(
                    id,
                    dto.UserName,
                    dto.Email,
                    dto.Password,
                    dto.Description,
                    dto.RolesId,
                    dto.UserIconUrl,
                    dto.ProjectsId
                );

                return Ok(updatedUser);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Произошла ошибка при обновлении пользователя", error = ex.Message });
            }
        }
        
        [HttpPost("login")]
        public IActionResult CheckUserInfo([FromBody] CheckUserInfoResponce request)
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