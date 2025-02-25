using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public enum TeacherType
    {
        HeadTeather = 0,
        Permanent = 1,
        Seasonal = 2,
        Intern = 3,
    }
    public class Teacher : BaseEntity<Guid>
    {
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PhysicalAddress { get; set; }
        public TeacherType Type { get; set; }
        public Guid SubjectId { get; set; }
        public virtual Subject Subject { get; set; }
        public Guid DepartmentId { get; set; }
        public virtual Department Department { get; set; }
    }
}
