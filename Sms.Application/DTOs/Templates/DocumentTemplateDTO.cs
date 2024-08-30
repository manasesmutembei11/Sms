using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities;

namespace Sms.Application.DTOs.Templates
{
    public class DocumentTemplateDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
        public int DocumentTemplateType { get; set; }
        public string DocumentTemplateTypeName { get; set; }
        public DateTime UpdatedOn  { get; set; }

    }

    public class DocumentTemplateFormDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }      
        public IFormFileCollection File { get; set; }
        public int DocumentTemplateType { get; set; }
       

    }
}
