using System.ComponentModel.DataAnnotations;

namespace Sms.Application.DTOs.Users
{
    public class ForgotPasswordDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
    }

    public class ResetPasswordDTO
    {
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        [Required(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please  use the link sent to your email to reset password")]
        public string Token { get; set; }
    }

}
