namespace Commands_back.Models;

public class User
{
    public Guid UserId { get; set; }
    public required string Password  { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public string? UserIconUrl { get; set; }
    public string? Description { get; set; }
    public Guid[]? RolesId { get; set; }
    public Guid[]? ProjectsId { get; set; }
}