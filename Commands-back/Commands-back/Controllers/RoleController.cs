using Commands_back.Services;
using Microsoft.AspNetCore.Mvc;
namespace Commands_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController(IRoleService roleService): ControllerBase
    {
        private readonly IRoleService _roleService = roleService;

        [HttpGet]
        public IActionResult GetAllRoles()
        {
            var roles = _roleService.GetAllRoles();
            return Ok(roles);
        }
        [HttpGet("{id}")]
        public IActionResult GetRoleById(string name)
        {
            var user = _roleService.GetRoleById(name);
            return Ok(user);
        }
        [HttpPost]
        public IActionResult CreateRole(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Название роли должно быть заполнено");
            }
            var roleId = _roleService.CreateRole(name);
            return CreatedAtAction(nameof(GetRoleById), new { id = roleId }, new { id = roleId });
        }

        [HttpDelete]
        public void DeleteUser(string name)
        {
            _roleService.DeleteRole(name);
        }
    }
}