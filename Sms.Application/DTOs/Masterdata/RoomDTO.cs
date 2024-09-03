using Sms.Core.Domain.Entities.Masterdata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Application.DTOs.Masterdata
{
    public class RoomDTO
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
    }
}
