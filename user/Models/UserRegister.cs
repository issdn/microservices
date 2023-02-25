using System.ComponentModel.DataAnnotations;

namespace user.Models
{
    public class UserRegisterModel
    {

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        [MaxLength(32, ErrorMessage = "Password must be less than 32 characters")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        [MaxLength(64, ErrorMessage = "Password must be less than 64 characters")]
        public string? Password { get; set; }
    }
};