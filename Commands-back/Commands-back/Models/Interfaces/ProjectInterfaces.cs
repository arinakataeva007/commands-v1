using Commands_back.Models.RequestModels;

namespace Commands_back.Models.interfaces;

public interface IProjectService
{
    List<Project> GetAllProjects();
    Project GetProjectById(Guid id);
    Guid CreatProject(CreateProjectRequest request);
    void DeleteProject(Guid id);
    void UpdateProjectInfo(UpdateProjectRequest request);
}
public interface IProjectRepository
{
    List<Project> GetAllProjects();
    Project GetProjectById(Guid id);
    Guid CreatProject(CreateProjectRequest request);
    void DeleteProject(Guid id);
    void UpdateProjectInfo(UpdateProjectRequest request);
}
