using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class UserLoginModel
    {
        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        [MaxLength(32, ErrorMessage = "Password must be less than 32 characters")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        [MaxLength(64, ErrorMessage = "Password must be less than 64 characters")]
        public string Password { get; set; } = null!;
    }
}