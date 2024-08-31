using Sms.Core.Domain.Entities.Templates;

namespace Sms.Core.Domain.Entities.Notifications
{
    public class AppNotificationEmail : BaseEntity<Guid>
    {
        public virtual AppNotification Notification { get; set; }
        public string Subject { get; set; }
        public string Template { get; set; }

    }
}
