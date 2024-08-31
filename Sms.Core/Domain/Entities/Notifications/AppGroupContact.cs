namespace Sms.Core.Domain.Entities.Notifications
{
    public class AppGroupContact : BaseEntity<Guid>

    {

        public string Email { get; set; }
        public string Phone { get; set; }
        public AppContactType ContactType { get; set; }
    }
}
