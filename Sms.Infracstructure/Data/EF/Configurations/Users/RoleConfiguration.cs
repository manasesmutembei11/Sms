using Sms.Core.Domain.Entities.UserEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Infrastructure.Data.EF.Configurations.Users
{
    internal class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasData(
                new Role { Id = new Guid("{5C5D0A1E-2629-4FCC-ADF8-4B85EC4E8363}"), Name = "user", NormalizedName = "USER", ConcurrencyStamp = "5C5D0A1E-2629-4FCC-ADF8-4B85EC4E8363" },
                new Role { Id = new Guid("{15279537-76EC-4285-853E-ECA3FC32C12B}"), Name = "admin", NormalizedName = "ADMIN", ConcurrencyStamp = "5C5D0A1E-2629-4FCC-ADF8-4B85EC4E8363" });
        }
    }
}
