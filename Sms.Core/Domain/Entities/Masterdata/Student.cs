using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public class Student : BaseEntity<Guid>
    {
        public string? Code { get; set; }
        public required string? FirstName { get; set; }
        public required string? LastName { get; set; }

        public required string? ParentEmail { get; set; }
        public required string? ParentPhone { get; set; }
        public required string? ParentName { get; set; }
        public Guid StreamId { get; set; }
        public Stream? Stream { get; set; }

    }
}
