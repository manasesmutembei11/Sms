﻿using Sms.Core.Domain.Entities.Masterdata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Application.DTOs.Masterdata
{
    public class StudentDTO
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
        public string ParentName { get; set; }
        public Guid RoomId { get; set; }
        public string RoomName { get; set; }
    }
}
