using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Infrastructure.Data.EF.Configurations.Notifications
{
    internal class AppGroupContactConfiguration : IEntityTypeConfiguration<AppGroupContact>
    {
        public void Configure(EntityTypeBuilder<AppGroupContact> builder)
        {
            builder.ToTable("sms_GroupContacts");
            builder.Property(u => u.Email).HasMaxLength(250);
            builder.Property(u => u.Phone).HasMaxLength(20);
            builder.HasIndex(u => u.ContactType).IsUnique();

        }
    }
}
