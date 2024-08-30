using Microsoft.AspNetCore.Http;
using Sms.Core.Domain.Entities.Templates;

namespace Sms.Application.DTOs.Templates
{
    public class EmailTemplateDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int EmailTemplateType { get; set; }
        public string EmailTemplateTypeName { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public byte[] FileContent { get; set; }
    }

    public class EmailTemplateFormDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }    =string.Empty;
        public IFormFileCollection File { get; set; }
        public int EmailTemplateType { get; set; }


    }
}
