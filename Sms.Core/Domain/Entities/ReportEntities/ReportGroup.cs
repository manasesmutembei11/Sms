using Sms.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.ReportEntities
{
    [Table("xpa_ReportGroups")]
    public class ReportGroup:BaseEntity<Guid>
    {
        public int No { get; set; }
        public string Name { get; set; }
    }

}
