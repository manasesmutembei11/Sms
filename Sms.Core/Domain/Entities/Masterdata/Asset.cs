﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Masterdata
{
    public class Asset : BaseEntity<Guid>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
        public decimal Total { get; set; }

        public string Description { get; set; }   
        public Guid DepartmentId { get; set; }
        public virtual Department Department { get; set; }

    }
}
