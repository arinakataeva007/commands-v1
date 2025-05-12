namespace Commands_back.Models;
using System.ComponentModel.DataAnnotations;

public class Role
{
    [Key]
    public Guid Id { get; set; }
    public required string RolesName { get; set; }
}