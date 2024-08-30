using System.ComponentModel.DataAnnotations;

namespace Sms.Application.DTOs.Auth
{
    public class SetupUserDTO
    {


        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
