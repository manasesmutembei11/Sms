namespace Sms.Core.Domain.Entities.UserEntities
{
    public class UserSignature : BaseEntity<Guid>
    {
        public byte[] FileContent { get; set; }
        public virtual User User { get; set; }

    }
}
