using System.ComponentModel;

namespace Sms.Core.Domain.Entities.Notifications
{
    public enum EmailAddressType
    {
        [Description("N/A")]
        None = 0,
        [Description("TO")]
        To = 1,
        [Description("CC")]
        cc = 2
    }
    public class AppNotificationEmailContact : BaseEntity<Guid>
    {
        public AppContactType ContactType { get; set; }
        public EmailAddressType AddressType { get; set; }
        public virtual AppNotificationEmail NotificationEmail { get; set; }
        public Guid NotificationEmailId { get; set; }
        
    }
}
