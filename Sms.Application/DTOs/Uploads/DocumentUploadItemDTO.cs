using System.ComponentModel;

namespace Sms.Application.DTOs.Uploads
{
    [Description("DocumentUploadItem")]
    public class DocumentUploadItemDTO 
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string RelativePath { get; set; }
    }

    
  

}
