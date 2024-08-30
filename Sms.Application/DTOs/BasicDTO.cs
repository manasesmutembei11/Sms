using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Application.DTOs
{
    public class BasicDTO<T>
    {
        public T Id { get; set; }
        public string Name { get; set; }
    }
}
