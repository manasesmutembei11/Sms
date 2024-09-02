using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Infrastructure.Data.EF.Configurations.Notifications
{
    internal class AppNotificationEmailContactConfiguration : IEntityTypeConfiguration<AppNotificationEmailContact>
    {
        public void Configure(EntityTypeBuilder<AppNotificationEmailContact> builder)
        {
            builder.ToTable("sms_NotificationEmailContacts");
            builder.HasOne(c => c.NotificationEmail).WithMany().OnDelete(DeleteBehavior.Restrict);


        }
    }
}
