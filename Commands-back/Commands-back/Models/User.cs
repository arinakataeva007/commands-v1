namespace Commands_back.Models;

public class User
{
    public Guid Id { get; set; }
    public required string Password  { get; set; }
    public string Username { get; set; }
    public required string Login { get; set; }
}