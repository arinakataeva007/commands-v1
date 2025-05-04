namespace Commands_back.Models.ResponceModels;

public class UpdateProjectResponce
{
    public required Guid Id { get; set; }
    public Guid? Author { get; set; }
    public string? ProjectName { get; set; }
    public string? ProjectDescreption { get; set; }
    public Guid[]? ProjectMembers { get; set; }
}

public class CreateProjectResponce
{
    public Guid Author { get; set; }
    public string ProjectName { get; set; }
    public string? ProjectDescreption { get; set; }
    public Guid[] ProjectMembers { get; set; }
    public string[]? ProjectRoles { get; set; }
}