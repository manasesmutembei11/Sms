using System.ComponentModel.DataAnnotations;
using Sms.Core.Domain.Entities.Templates;

namespace Sms.Core.Domain.Entities.Notifications
{
    public class OutgoingEmail : BaseEntity<Guid>
    {
       

        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsSent { get; set; }
        public bool IsLocked { get; set; }
        public string AddressTo { get; set; }
        public string AddressCC { get; set; }
        public string AttachmentPath { get; set; }       
        public string AddressBcc { get; set; }
        public int RetryCount { get; set; }
        public DateTime NextRetry { get; set; }
        public string ProcessingInfo { get; set; }

        
    }
    public class OutgoingEmailAttachment :BaseEntity<Guid>
    {
    
       
        public Guid EmailId { get; set; }
        public virtual OutgoingEmail Email { get; set; }
        public Guid RefId { get; set; }
        public DocumentTemplateType DocumentType { get; set; }
        public string Path { get; set; }
    }
}
