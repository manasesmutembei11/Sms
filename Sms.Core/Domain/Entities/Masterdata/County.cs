using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public class County : BaseEntity<Guid>
    {
        public int Code { get; set; }
        public string? Name { get; set; }


    }
}
