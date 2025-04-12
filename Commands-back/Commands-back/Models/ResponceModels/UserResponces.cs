namespace Commands_back.Models.ResponceModels;

public class CreateUserResponce
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string Description { get; set; } = "";
    public Guid[] RolesId { get; set; } = [];
    public string PathIcon { get; set; } = "";
}