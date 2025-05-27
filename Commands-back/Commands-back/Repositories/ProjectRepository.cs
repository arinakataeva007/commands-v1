using Commands_back.Data;
using Commands_back.Models;
using Commands_back.Models.RequestModels;

namespace Commands_back.Repositories;
using Commands_back.Models.interfaces;
public class ProjectRepository(AppDbContext context) : IProjectRepository
{
    private readonly AppDbContext _context = context;
    public List<Project> GetAllProjects()
    {
        return _context.Projects.ToList();
    }

    public Project GetProjectById(Guid id)
    {
        return _context.Projects.FirstOrDefault(project => project.Id == id) ?? throw new InvalidOperationException();
    }

    public Guid CreatProject(CreateProjectRequest request)
    {
        var newProject = new Project
        {
            Id = Guid.NewGuid(),
            ProjectName = request.ProjectName,
            ProjectDescription = request.ProjectDescreption,
            ProjectMembersId = request.ProjectMembers,
            Author = request.Author,
            ProjectRoles = request.ProjectRoles,
        };
        _context.Projects.Add(newProject);
        _context.SaveChanges();
        return newProject.Id;
    }

    public void DeleteProject(Guid id)
    {
        var project = _context.Projects.FirstOrDefault(p => p.Id == id);

        if (project == null)
        {
            throw new InvalidOperationException($"Проект с ID {id} не найден.");
        }

        _context.Projects.Remove(project);
        _context.SaveChanges();
    }

    public void UpdateProjectInfo(UpdateProjectRequest request)
    {
        var project = _context.Projects.FirstOrDefault(p => p.Id == request.Id);
        if (project == null) return;

        if (!string.IsNullOrEmpty(request.ProjectName)) project.ProjectName = request.ProjectName;
        if (request.Author.HasValue) project.Author = request.Author.Value;
        if (!string.IsNullOrEmpty(request.ProjectDescreption)) project.ProjectDescription = request.ProjectDescreption;
        if (request.ProjectMembers != null && request.ProjectMembers.Length > 0)  project.ProjectMembersId = request.ProjectMembers;

        _context.Projects.Update(project);
        _context.SaveChanges();
    }
}