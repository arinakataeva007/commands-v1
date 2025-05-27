namespace Commands_back.Models.ResponseModels;

public class UpdateProjectResponse
{
    public required Guid Id { get; set; }
    public Guid? Author { get; set; }
    public string? ProjectName { get; set; }
    public string? ProjectDescreption { get; set; }
    public Guid[]? ProjectMembers { get; set; }
}

public class CreateProjectResponse
{
    public Guid Author { get; set; }
    public string ProjectName { get; set; }
    public string? ProjectDescreption { get; set; }
    public Guid[] ProjectMembers { get; set; }
    public string[]? ProjectRoles { get; set; }
}