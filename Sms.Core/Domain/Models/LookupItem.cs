using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Models
{
    
    public record class LookupItem<T>(T Id, string Name,string Code);

}
