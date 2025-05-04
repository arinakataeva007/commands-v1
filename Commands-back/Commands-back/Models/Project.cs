namespace Commands_back.Models;

public class Project
{
    public Guid Id { get; set; }
    public Guid Author { get; set; }
    public required string ProjectName { get; set; }
    public string? ProjectDescription { get; set; }
    public Guid[] ProjectMembersId { get; set; }
    public string[]? ProjectRoles { get; set; }
}