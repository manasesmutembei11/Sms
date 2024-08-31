using Sms.Core.Domain.Entities.Templates;

namespace Sms.Core.Domain.Entities.Notifications
{
    public class AppNotificationSms : BaseEntity<Guid>
    {
        
        
        public virtual AppNotification Notification { get; set; }
        public string Template { get; set; }

    }
}
