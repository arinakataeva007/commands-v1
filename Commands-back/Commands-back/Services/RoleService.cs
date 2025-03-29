using Commands_back.Models;
using Commands_back.Repositories;

namespace Commands_back.Services;

public interface IRoleService
{
    List<Role> GetAllRoles();
    Role GetRoleById(Guid id);
    Guid CreateRole(string name);
    void DeleteRole(Guid id);
}
public class RoleService(IRoleRepository roleRepository) : IRoleService
{
    private readonly IRoleRepository _roleRepository = roleRepository;
    public List<Role> GetAllRoles()
    {
        return _roleRepository.GetAllRoles();
    }

    public Role GetRoleById(Guid id)
    {
        return _roleRepository.GetRoleById(id);
    }

    public Guid CreateRole(string name)
    {
        return _roleRepository.CreateRole(name);
    }

    public void DeleteRole(Guid id)
    {
        _roleRepository.DeleteRole(id);
    }
}