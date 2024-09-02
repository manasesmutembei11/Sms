using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Infrastructure.Data.EF.Configurations.Notifications
{
    internal class AppNotificationSmsContactConfiguration : IEntityTypeConfiguration<AppNotificationSmsContact>
    {
        public void Configure(EntityTypeBuilder<AppNotificationSmsContact> builder)
        {
            builder.ToTable("sms_NotificationSmsContacts");
            builder.HasOne(c => c.NotificationSms).WithMany().OnDelete(DeleteBehavior.Restrict);
        }
    }
}
