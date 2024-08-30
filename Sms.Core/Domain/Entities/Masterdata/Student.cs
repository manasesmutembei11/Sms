using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public class Student : BaseEntity<Guid>
    {
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
        public string ParentName { get; set; }
        public Guid RoomId { get; set; }
        public virtual Room Stream { get; set; }

    }
}
