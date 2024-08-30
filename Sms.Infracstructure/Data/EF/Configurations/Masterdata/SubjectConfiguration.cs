using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Masterdata;

namespace Sms.Infrastructure.Data.EF.Configurations.Masterdata
{
    internal class SubjectConfiguration : IEntityTypeConfiguration<Subject>
    {
        public void Configure(EntityTypeBuilder<Subject> builder)
        {
            builder.ToTable("md_Subjects");
            builder.HasIndex(u => u.Code).IsUnique();
            builder.Property(u => u.Code).HasMaxLength(50);
            builder.Property(u => u.Name).HasMaxLength(100);
            builder.Property(u => u.Description).HasMaxLength(250);
        }
    }
}
