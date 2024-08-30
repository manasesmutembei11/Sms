using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public class Staff : BaseEntity <Guid>
    {
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone {  get; set; }
        public string Email { get; set; }
        public string Address {  get; set; }
        public Guid CountyId { get; set; }
        public County County { get; set; }


    }
}
