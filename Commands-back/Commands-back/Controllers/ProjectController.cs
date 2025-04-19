using Commands_back.Models.ResponceModels;
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
    public void UpdateProjectInfo([FromBody] UpdateProjectResponce request)
    {
        _projectService.UpdateProjectInfo(request.Id, request.Author, request.ProjectName, request.ProjectDescreption, request.ProjectMembers);
    }

    [HttpPost]
    public IActionResult CreateProject([FromBody] CreateProjectResponce request)
    {
        var id = _projectService.CreatProject(request.Author, request.ProjectName, request.ProjectDescreption, request.ProjectMembers);
        return Ok(id);
    }

    [HttpDelete("{id}")]
    public void DeleteProject(Guid id)
    {
        _projectService.DeleteProject(id);
    }
}
