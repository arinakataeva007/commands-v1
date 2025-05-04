using Commands_back.Data;
using Commands_back.Models;

namespace Commands_back.Repositories;
public interface IProjectRepository
{
    List<Project> GetAllProjects();
    Project GetProjectById(Guid id);
    Guid CreatProject(Guid author, string projectName, string? projectDescription, Guid[] projectMembers, string[]? projectRoles);
    void DeleteProject(Guid id);
    void UpdateProjectInfo(Guid id, Guid? author, string? projectName, string? projectDescreption, Guid[]? projectMembers);
}
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

    public Guid CreatProject(Guid author, string projectName, string? projectDescription, Guid[] projectMembers, string[] projectRoles)
    {
        var newProject = new Project
        {
            Id = Guid.NewGuid(),
            ProjectName = projectName,
            ProjectDescription = projectDescription,
            ProjectMembersId = projectMembers,
            Author = author,
            ProjectRoles = projectRoles
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

    public void UpdateProjectInfo(Guid id, Guid? author, string? projectName, string? projectDescreption, Guid[]? projectMembers)
    {
        var project = _context.Projects.FirstOrDefault(p => p.Id == id);
        if (project == null) return;

        if (!string.IsNullOrEmpty(projectName)) project.ProjectName = projectName;
        if (author.HasValue) project.Author = author.Value;
        if (!string.IsNullOrEmpty(projectDescreption)) project.ProjectDescription = projectDescreption;
        if (projectMembers != null && projectMembers.Length > 0)  project.ProjectMembersId = projectMembers;

        _context.Projects.Update(project);
        _context.SaveChanges();
    }
}