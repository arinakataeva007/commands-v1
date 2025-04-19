using Commands_back.Models;
using Microsoft.AspNetCore.Identity;

namespace Commands_back.Services
{
    public class PasswordHasher
    {
        private readonly Microsoft.AspNetCore.Identity.PasswordHasher<User> _hasher = new();

        public string HashPassword(User user, string plainPassword)
        {
            return _hasher.HashPassword(user, plainPassword);
        }

        public bool VerifyPassword(User user, string plainPassword)
        {
            if (string.IsNullOrEmpty(user.Password))
                return false;

            var result = _hasher.VerifyHashedPassword(user, user.Password, plainPassword);
            return result == PasswordVerificationResult.Success;
        }
    }
}