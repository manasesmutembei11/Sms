using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Emit;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Infrastructure.Data.EF
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid>
    {
        private readonly ILogger<AppDbContext> _logger;

        public AppDbContext(DbContextOptions<AppDbContext> options, ILogger<AppDbContext> logger) : base(options)
        {
            _logger = logger;
            _logger.LogDebug("Create AppDbContext");
        }
        public DbSet<AuditTrail> AuditTrails { get; set; }
        public DbSet<ReportGroupItem> ReportGroupItems { get; set; }
        public DbSet<ReportGroup> ReportGroups { get; set; }
        public DbSet<Config> Configs { get; set; }
        public DbSet<UploadConfig> UploadConfigs { get; set; }
        public DbSet<Upload> Uploads { get; set; }
        public DbSet<UploadType> UploadTypes { get; set; }
        public DbSet<UploadOther> UploadOthers { get; set; }

        public DbSet<AppCounter> Counters { get; set; }
        public DbSet<DocumentTemplate> DocumentTemplates { get; set; }









        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(b =>
            {
                b.ToTable("xpa_Users");
            });

            builder.Entity<IdentityUserClaim<Guid>>(b =>
            {
                b.ToTable("xpa_UserClaims");
            });

            builder.Entity<IdentityUserLogin<Guid>>(b =>
            {
                b.ToTable("xpa_UserLogins");
            });

            builder.Entity<IdentityUserToken<Guid>>(b =>
            {
                b.ToTable("xpa_UserTokens");
            });

            builder.Entity<Role>(b =>
            {
                b.ToTable("xpa_Roles");
            });

            builder.Entity<IdentityRoleClaim<Guid>>(b =>
            {
                b.ToTable("xpa_RoleClaims");
            });

            builder.Entity<IdentityUserRole<Guid>>(b =>
            {
                b.ToTable("xpa_UserRoles");
            });



            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            SeedData.Initialize(builder);




        }

        public string GetTableName<TEntity>() where TEntity : class
        {
            var entityType = this.Model.FindEntityType(typeof(TEntity));
            var tableName = entityType.GetTableName();
            return tableName;
        }


    }
}
