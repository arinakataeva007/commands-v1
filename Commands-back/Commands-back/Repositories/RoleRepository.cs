using Commands_back.Data;
using Commands_back.Models;
using Commands_back.Models.interfaces;

namespace Commands_back.Repositories;
public class RoleRepository(AppDbContext context) : IRoleRepository
{
    private readonly AppDbContext _context = context;
    public List<Role> GetAllRoles()
    {
        return _context.Roles.ToList();
    }

    public Role GetRoleById(Guid id)
    {
        return _context.Roles.FirstOrDefault(role => role.Id == id)?? throw new InvalidOperationException();
    }

    public string CreateRole(string name)
    {
        var newRole = new Role
        {
            Id = Guid.NewGuid(),
            RolesName = name
        };
        _context.Roles.Add(newRole);
        _context.SaveChanges();
        return newRole.RolesName;
    }

    public void DeleteRole(string name)
    {
        var role = _context.Roles.FirstOrDefault(role => role.RolesName == name);

        if (role == null)
        {
            throw new InvalidOperationException($"Роль с названием {name} не найдена.");
        }

        _context.Roles.Remove(role);
        _context.SaveChanges();
    }
}