using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Application.DTOs.Reports;

namespace Sms.Application.DTOs.Reports
{
    public class ReportGroupDTO
    {
        public ReportGroupDTO()
        {
            Reports = new List<ReportGroupItemDTO> { };
        }
        public Guid Id { get; set; }
        public int No { get; set; }
        public string Name { get; set; }

        public List<ReportGroupItemDTO> Reports { get; set; }
    }
}
