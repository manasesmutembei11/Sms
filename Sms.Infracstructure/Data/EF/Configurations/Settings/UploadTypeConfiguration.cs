using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.Uploads;

namespace Sms.Infrastructure.Data.EF.Configurations.Settings
{
    internal class UploadTypeConfiguration : IEntityTypeConfiguration<UploadType>
    {
        public void Configure(EntityTypeBuilder<UploadType> builder)
        {

            builder.HasIndex(u => u.Code).IsUnique();
            builder.Property(u => u.Code).HasMaxLength(50);
            builder.Property(u => u.Name).HasMaxLength(100);


        }
    }
}
