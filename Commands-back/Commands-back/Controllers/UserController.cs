using Commands_back.Models.ResponceModels;
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
        public IActionResult CreateUser([FromBody] CreateUserResponce request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest("Имя и Почта должны быть заполнены");
            }
            var userId = _userService.CreatUser(request.Name, request.Email, request.Password, request.Description, request.RolesId, request.PathIcon);
            return CreatedAtAction(nameof(GetUserById), new { id = userId }, new { id = userId });
        }

        [HttpDelete]
        public void DeleteUser(Guid id)
        {
            _userService.DeleteUser(id);
        }
    }
}