using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sms.Core.Domain.Entities.UserEntities;

namespace Sms.Infrastructure.Data.EF.Configurations.Users
{
    internal class UserSignatureConfiguration : IEntityTypeConfiguration<UserSignature>
    {
        public void Configure(EntityTypeBuilder<UserSignature> builder)
        {
            builder.ToTable("xpa_UserSignatures");
            builder.HasOne(b => b.User).WithMany().HasForeignKey(pt => pt.Id);

        }
    }
}
