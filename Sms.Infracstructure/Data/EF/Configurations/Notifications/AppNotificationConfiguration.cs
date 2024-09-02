using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Infrastructure.Data.EF.Configurations.Notifications
{
    internal class AppNotificationConfiguration : IEntityTypeConfiguration<AppNotification>
    {
        public void Configure(EntityTypeBuilder<AppNotification> builder)
        {
            builder.ToTable("sms_Notifications");
            builder.HasIndex(u => u.Type).IsUnique();
            builder.Property(u => u.Description).HasMaxLength(100);

        }
    }
}
