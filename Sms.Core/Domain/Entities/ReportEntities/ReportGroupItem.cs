using Sms.Core.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sms.Core.Domain.Entities.ReportEntities
{
    [Table("xpa_Reports")]
    public class ReportGroupItem : BaseEntity<Guid>
    {

        public int No { get; set; }
        public string Name { get; set; }
        public string ReportUrl { get; set; }        
        public Guid GroupId { get; set; }
        public virtual ReportGroup Group { get; set; }


    }

}
