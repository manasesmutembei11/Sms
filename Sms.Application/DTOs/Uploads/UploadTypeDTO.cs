using Sms.Core.Domain.Entities.Uploads;
using Sms.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Application.DTOs.Uploads
{
    public record class UploadTypeDTO(
        Guid Id,
        string Name,
        string Code,
        string Description
       
        )
    {
        public UploadMimeTypeDTO[] Extensions { get; set; } = new UploadMimeTypeDTO[0];
        public string AllowedFileTypes { get; set; }
    }

    public class UploadConfigDTO

    {
        public Guid Id { get; set; }
        public string UploadTypeName { get; set; }
        public Guid UploadTypeId { get; set; }
        public bool IsRequired { get; set; }
        public int UploadOperation { get; set; }
       
    }

    public class PhotoItemDTO

    {
        public Guid Id { get; set; }
        public string Uri { get; set; }
        public string Remarks { get; set; }
        

    }

}
