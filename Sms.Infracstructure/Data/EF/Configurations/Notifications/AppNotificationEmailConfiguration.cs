using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Infrastructure.Data.EF.Configurations.Notifications
{
    internal class AppNotificationEmailConfiguration : IEntityTypeConfiguration<AppNotificationEmail>
    {
        public void Configure(EntityTypeBuilder<AppNotificationEmail> builder)
        {
            builder.ToTable("sms_NotificationEmail");
            builder.HasOne(b => b.Notification).WithMany().HasForeignKey(pt => pt.Id);
            builder.Property(u => u.Subject).HasMaxLength(250);

        }
    }
}
