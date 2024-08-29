using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public class Department : BaseEntity<Guid>
    {
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

    }
}
