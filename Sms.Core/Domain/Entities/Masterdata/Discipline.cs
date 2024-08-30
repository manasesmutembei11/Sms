using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public enum DisciplineActions
    {
        Warning = 1,
        Suspension = 2,
        Punishment = 3,
        Lossofpriviledge = 4,
        Detension = 5,
        Expulsion = 6,


    }
    public class Discipline : BaseEntity<Guid>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description {  get; set; }
        public DisciplineActions Actions { get; set; }
        
    }
}
