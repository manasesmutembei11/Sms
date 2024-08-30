using System.ComponentModel.DataAnnotations.Schema;

namespace Sms.Core.Domain.Entities.Uploads
{
    [Table("upload_configs")]
    public class UploadConfig : BaseEntity<Guid>
    {
        public virtual UploadType UploadType { get; set; }
        public Guid UploadTypeId { get; set; }
        public bool IsRequired { get; set; }
        public UploadOperation OperationType { get; set; }
    }
}
