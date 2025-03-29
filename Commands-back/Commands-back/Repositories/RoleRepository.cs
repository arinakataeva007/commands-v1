using Commands_back.Data;
using Commands_back.Models;

namespace Commands_back.Repositories;

public interface IRoleRepository
{
    List<Role> GetAllRoles();
    Role GetRoleById(Guid id);
    Guid CreateRole(string name);
    void DeleteRole(Guid id);
}
public class RoleRepository(AppDbContext context) : IRoleRepository
{
    private readonly AppDbContext _context = context;
    public List<Role> GetAllRoles()
    {
        return _context.Roles.ToList();
    }

    public Role GetRoleById(Guid id)
    {
        return _context.Roles.FirstOrDefault(role => role.RoleId == id)?? throw new InvalidOperationException();
    }

    public Guid CreateRole(string name)
    {
        var newRole = new Role
        {
            RoleId = Guid.NewGuid(),
            RolesName = name
        };
        _context.Roles.Add(newRole);
        _context.SaveChanges();
        return newRole.RoleId;
    }

    public void DeleteRole(Guid id)
    {
        var role = _context.Roles.FirstOrDefault(role => role.RoleId == id);

        if (role == null)
        {
            throw new InvalidOperationException($"Роль с ID {id} не найдена.");
        }

        _context.Roles.Remove(role);
        _context.SaveChanges();
    }
}