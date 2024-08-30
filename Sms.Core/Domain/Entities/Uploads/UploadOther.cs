using System.ComponentModel.DataAnnotations.Schema;

namespace Sms.Core.Domain.Entities.Uploads
{
    [Table("upload_others")]
    public class UploadOther : BaseEntity<Guid>
    {
        public string RelativePath { get; set; }
        public string FileName { get; set; }
        public Guid ReferenceId { get; set; }       
        public string Remarks { get; set; }
    }
}
