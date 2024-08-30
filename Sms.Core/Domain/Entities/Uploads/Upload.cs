using System.ComponentModel.DataAnnotations.Schema;

namespace Sms.Core.Domain.Entities.Uploads
{
    [Table("uploads")]
    public class Upload : BaseEntity<Guid>
    {

        public UploadOperation Operation { get; set; }

        public  Guid UploadTypeId { get; set; }
        public virtual UploadType UploadType { get; set; }
        public string Path { get; set; }        
        public string FileName { get; set; }
        public Guid ReferenceId { get; set; }        
        public string Remarks { get; set; }
        public bool IsAbsolutePath { get; set; }
        public bool IsSystemUpload { get; set; }
        public bool Archived { get; set; }
    }
}
