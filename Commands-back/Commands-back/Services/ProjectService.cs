using Commands_back.Models;
using Commands_back.Models.interfaces;
using Commands_back.Models.RequestModels;
using Commands_back.Models.ResponseModels;

namespace Commands_back.Services;
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

    public Guid CreatProject(CreateProjectRequest request)
    {
        return _prRepository.CreatProject(request);
    }

    public void DeleteProject(Guid id)
    {
        _prRepository.DeleteProject(id);
    }

    public void UpdateProjectInfo(UpdateProjectRequest request)
    {
        _prRepository.UpdateProjectInfo(request);
    }
}