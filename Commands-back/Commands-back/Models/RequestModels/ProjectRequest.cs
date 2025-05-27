namespace Commands_back.Models.RequestModels;

public class CreateProjectRequest
{
    public Guid Author { get; set; }
    public string ProjectName { get; set; }
    public string? ProjectDescreption { get; set; }
    public Guid[] ProjectMembers { get; set; }
    public string[]? ProjectRoles { get; set; }
}

public class UpdateProjectRequest
{
    public required Guid Id { get; set; }
    public Guid? Author { get; set; }
    public string? ProjectName { get; set; }
    public string? ProjectDescreption { get; set; }
    public Guid[]? ProjectMembers { get; set; }
}