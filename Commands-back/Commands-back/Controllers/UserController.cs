using Commands_back.Services;
using Microsoft.AspNetCore.Mvc;

namespace Commands_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

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
        public IActionResult CreateUser(string name, string email, string password, string description = "",
            Guid[] rolesId = null, string pathIcon = null)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Имя и Почта должны быть заполнены");
            }
            var userId = _userService.CreatUser(name, email, password, description, rolesId, pathIcon);
            return CreatedAtAction(nameof(GetUserById), new { id = userId }, new { id = userId });
        }

        [HttpDelete]
        public void DeleteUser(Guid id)
        {
            _userService.DeleteUser(id);
        }
    }
}