using Commands_back.Models;
using Commands_back.Repositories;

namespace Commands_back.Services;

public interface IRoleService
{
    List<Role> GetAllRoles();
    Role GetRoleById(Guid id);
    string CreateRole(string name);
    void DeleteRole(string name);
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

    public string CreateRole(string name)
    {
        return _roleRepository.CreateRole(name);
    }

    public void DeleteRole(string name)
    {
        _roleRepository.DeleteRole(name);
    }
}