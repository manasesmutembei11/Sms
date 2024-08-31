namespace Sms.Core.Domain.Entities.Notifications
{
    public class AppNotificationSmsContact : BaseEntity<Guid>
    {
        public AppContactType ContactType { get; set; }
        public virtual AppNotificationSms NotificationSms { get; set; }
        public Guid NotificationSmsId { get; set; }

    }
}
