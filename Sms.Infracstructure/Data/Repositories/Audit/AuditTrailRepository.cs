using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Audit;
using Sms.Core.Domain.Entities;
using Sms.Core.Domain.Repositories.Audit;
using Sms.Core.Domain.Util;
using Sms.Infrastructure.Data.EF;
using Sms.Core.Domain.Providers;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Sms.Infrastructure.Data.Repositories.Audit
{
    internal class AuditTrailRepository : IAuditTrailRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserProvider _userProvider;

        public AuditTrailRepository(AppDbContext context, IUserProvider userProvider)
        {
            _context = context;
            _userProvider = userProvider;
        }
        public void LogAuditTrail()
        {
            Guid transactionId = Guid.NewGuid();
            //Transformer();
            IEnumerable<EntityEntry> changes = _context.ChangeTracker.Entries()
                .Where(s => s.State == EntityState.Added || s.State == EntityState.Deleted || s.State == EntityState.Modified).ToList();
            foreach (var c in changes.Where(s => s.Entity is IAuditable))
            {

                List<AuditTrail> audits = new List<AuditTrail>();
                if (c.State == EntityState.Deleted)
                {
                    foreach (var prop in c.Properties)
                    {
                        var audit = AuditTrailFactory(c, prop, transactionId);
                        if (audit != null)
                        {
                            audits.Add(audit);
                        }
                    }
                }
                else
                {
                    foreach (var prop in c.Properties)
                    {
                        var audit=AuditTrailFactory(c, prop, transactionId);
                        if (audit != null)
                        {
                            audits.Add(audit);
                        }
                     
                    }
                }
                audits = audits.Where(s => s.OrginalValue != s.CurrentValue).ToList();
                _context.AuditTrails.AddRange(audits);
            }
        }

        private AuditTrail AuditTrailFactory(EntityEntry c, PropertyEntry prop, Guid transactionId)
        {
            var audit = new AuditTrail();
            audit.Id = Guid.NewGuid();
            audit.TransactionId = transactionId;
            audit.TableName = GetTableName(c);
            audit.UserId = _userProvider.User.Id;
            audit.UserName = _userProvider.User.Username;
            audit.IPAddress = _userProvider.IpAddress;
            audit.Application = _userProvider.ApplicationName;
            audit.AuditDate = DateTime.Now;

            //audit.ColumnName = prop.Metadata.GetColumnName();
            audit.ColumnName = prop.Metadata.GetColumnName(StoreObjectIdentifier.Table(audit.TableName, null));
            if(string.IsNullOrEmpty(audit.ColumnName)) return null;
            if (c.State == EntityState.Added)
            {
                audit.Action = AuditActions.ADD;
                audit.CurrentValue = ToStringValue(prop.CurrentValue);
                audit.RecordId = c.CurrentValues["Id"].ToString();
            }
            else if (c.State == EntityState.Deleted)
            {
                audit.Action = AuditActions.DELETE.ToString();
                audit.OrginalValue = ToStringValue(prop.OriginalValue);
                audit.RecordId = c.OriginalValues["Id"].ToString();
            }
            else
            {
                var original = c.GetDatabaseValues().GetValue<object>(audit.ColumnName);
                audit.Action = AuditActions.UPDATE.ToString();
                audit.OrginalValue = ToStringValue(original);
                audit.CurrentValue = ToStringValue(prop.CurrentValue);

                audit.RecordId = c.CurrentValues["Id"].ToString();
            }
            return audit;
        }


        private string ToStringValue(object v)
        {
            if (v != null) { return v.ToString(); }
            return null;
        }
        private string GetTableName(EntityEntry c)
        {
            var tableName = c.Metadata.GetTableName();


            return tableName;
        }
    }
}
