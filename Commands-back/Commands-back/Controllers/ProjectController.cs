using Commands_back.Services;
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
    public void UpdateProjectInfo(Guid id, Guid? author, string? projectName, string? projectDescreption,
        Guid[]? projectMembers)
    {
        _projectService.UpdateProjectInfo(id, author, projectName, projectDescreption, projectMembers);
    }

    [HttpPost]
    public IActionResult CreateProject(Guid author, string projectName, string? projectDescription, Guid[] projectMembers)
    {
        var id = _projectService.CreatProject(author, projectName, projectDescription, projectMembers);
        return Ok(id);
    }

    [HttpDelete("{id}")]
    public void DeleteProject(Guid id)
    {
        _projectService.DeleteProject(id);
    }
}
