using Commands_back.Models.ResponseModels;
using Commands_back.Models.interfaces;
using Commands_back.Models.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace Commands_back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController(IProjectService projectService) : ControllerBase
{
    private readonly IProjectService _projectService = projectService;

    [HttpGet]
    public IActionResult GetAllProjects()
    {
        var projects = _projectService.GetAllProjects();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public IActionResult GetProjectById(Guid id)
    {
        var project = _projectService.GetProjectById(id);
        return Ok(project);
    }

    [HttpPut("{id}")]
    public void UpdateProjectInfo([FromBody] UpdateProjectResponse request)
    {
        var newProject = new UpdateProjectRequest
        {
            Id = request.Id,
            ProjectName = request.ProjectName,
            Author = request.Author,
            ProjectDescreption = request.ProjectDescreption,
            ProjectMembers = request.ProjectMembers,
        };
        _projectService.UpdateProjectInfo(newProject);
    }

    [HttpPost]
    public IActionResult CreateProject([FromBody] CreateProjectResponse request)
    {
        var project = new CreateProjectRequest
        {
            ProjectName = request.ProjectName,
            ProjectDescreption = request.ProjectDescreption,
            ProjectMembers = request.ProjectMembers,
            Author = request.Author,
            ProjectRoles = request.ProjectRoles
        };
        var id = _projectService.CreatProject(project);
        return Ok(id);
    } 

    [HttpDelete("{id}")]
    public void DeleteProject(Guid id)
    {
        _projectService.DeleteProject(id);
    }
}
