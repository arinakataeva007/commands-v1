namespace Commands_back.Models.interfaces;

public interface IRoleService
{
    List<Role> GetAllRoles();
    Role GetRoleById(Guid id);
    string CreateRole(string name);
    void DeleteRole(string name);
}
public interface IRoleRepository
{
    List<Role> GetAllRoles();
    Role GetRoleById(Guid id);
    string CreateRole(string name);
    void DeleteRole(string name);
}