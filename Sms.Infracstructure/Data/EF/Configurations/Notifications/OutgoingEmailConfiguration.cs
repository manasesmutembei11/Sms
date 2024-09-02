using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Infrastructure.Data.EF.Configurations.Notifications
{
    internal class OutgoingEmailConfiguration : IEntityTypeConfiguration<OutgoingEmail>
    {
        public void Configure(EntityTypeBuilder<OutgoingEmail> builder)
        {
            builder.ToTable("sms_OutgoingEmails");
            builder.Property(u => u.Subject).HasMaxLength(1000);

        }
    }
    internal class OutgoingEmailAttachmentConfiguration : IEntityTypeConfiguration<OutgoingEmailAttachment>
    {
        public void Configure(EntityTypeBuilder<OutgoingEmailAttachment> builder)
        {
            builder.ToTable("sms_OutgoingEmailAttachments");
            builder.HasOne(c => c.Email).WithMany().OnDelete(DeleteBehavior.Restrict);
        }
    }
}
