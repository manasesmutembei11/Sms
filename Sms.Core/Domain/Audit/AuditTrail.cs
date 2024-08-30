using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Audit
{
    public class AuditTrail
    {
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public string UserName { get; set; }
        public string Action { get; set; }
        public string OrginalValue { get; set; }
        public string CurrentValue { get; set; }
        public DateTime AuditDate { get; set; }
        public string TableName { get; set; }
        public string Module { get; set; }
        public string Application { get; set; }
        public Guid TransactionId { get; set; }
        public string RecordId { get; set; }
        public string IPAddress { get; set; }
        public string ColumnName { get; set; }
    }
}
