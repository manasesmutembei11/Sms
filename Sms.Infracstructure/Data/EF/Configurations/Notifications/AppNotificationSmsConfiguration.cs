using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Infrastructure.Data.EF.Configurations.Notifications
{
    internal class AppNotificationSmsConfiguration : IEntityTypeConfiguration<AppNotificationSms>
    {
        public void Configure(EntityTypeBuilder<AppNotificationSms> builder)
        {
            builder.ToTable("sms_NotificationSms");
            builder.HasOne(b => b.Notification).WithMany().HasForeignKey(pt => pt.Id);


        }
    }
}
