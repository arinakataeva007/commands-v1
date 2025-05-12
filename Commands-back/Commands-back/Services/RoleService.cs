using Commands_back.Models;
using Commands_back.Repositories;

namespace Commands_back.Services;

public interface IRoleService
{
    List<Role> GetAllRoles();
    Role GetRoleById(string name);
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

    public Role GetRoleById(string name)
    {
        return _roleRepository.GetRoleByName(name);
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