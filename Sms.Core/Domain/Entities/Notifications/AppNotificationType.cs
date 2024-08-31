using System.ComponentModel;

namespace Sms.Core.Domain.Entities.Notifications
{
    public enum AppNotificationType
    {
       
        [Description("User Account : Email Confirmation")]
        EmailConfirmation = 1,
        [Description("User Account : Reset Password")]
        ResetPassword = 2,

        [Description("Task : New Assessment Task")]
        NewAssessmentTask = 10,
    }

}
