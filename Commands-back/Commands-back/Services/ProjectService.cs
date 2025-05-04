using Commands_back.Models;
using Commands_back.Repositories;

namespace Commands_back.Services;
public interface IProjectService
{
    List<Project> GetAllProjects();
    Project GetProjectById(Guid id);
    Guid CreatProject(Guid author, string projectName, string? projectDescription, Guid[] projectMembers, string[]? projectRoles);
    void DeleteProject(Guid id);
    void UpdateProjectInfo(Guid id, Guid? author, string? projectName, string? projectDescreption, Guid[]? projectMembers);
}
public class ProjectService(IProjectRepository projectRepository) : IProjectService
{
    private readonly IProjectRepository _prRepository = projectRepository;
    public List<Project> GetAllProjects()
    {
        return _prRepository.GetAllProjects();
    }

    public Project GetProjectById(Guid id)
    {
        return _prRepository.GetProjectById(id);
    }

    public Guid CreatProject(Guid author, string projectName, string? projectDescription, Guid[] projectMembers, string[] projectRoles)
    {
        return _prRepository.CreatProject(author, projectName, projectDescription, projectMembers, projectRoles);
    }

    public void DeleteProject(Guid id)
    {
        _prRepository.DeleteProject(id);
    }

    public void UpdateProjectInfo(Guid id, Guid? author, string? projectName, string? projectDescreption, Guid[]? projectMembers)
    {
        _prRepository.UpdateProjectInfo(id, author, projectName, projectDescreption, projectMembers);
    }
}