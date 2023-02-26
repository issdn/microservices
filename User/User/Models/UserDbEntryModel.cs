using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class UserDbEntryModel : UserRegisterModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Salt is required")]
        [StringLength(64, ErrorMessage = "Salt must be exactly 64 characters long")]
        public string Salt { get; set; } = null!;
    }
};