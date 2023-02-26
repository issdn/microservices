using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class UserRegisterModel : UserLoginModel
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(255, ErrorMessage = "Email cannot be longer than 255 characters")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = null!;
    }
};