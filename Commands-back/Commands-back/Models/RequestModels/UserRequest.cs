namespace Commands_back.Models.RequestModels;

public class CreateUserRequest
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string Description { get; set; } = "";
    public string UserIconUrl { get; set; } = "";
    public Guid[] RolesId { get; set; } = [];
    public Guid[] ProjectsId { get; set; } = [];
}

public class UpdateUserRequest
{
    public Guid UserId { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Description { get; set; }
    public Guid[]? RolesId { get; set; }
    public string? UserIconUrl { get; set; }
    public Guid[] ProjectsId { get; set; }
}