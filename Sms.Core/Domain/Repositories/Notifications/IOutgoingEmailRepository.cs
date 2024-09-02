using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Core.Domain.Repositories.Notifications
{
    public interface IOutgoingEmailRepository : IRepositoryBase<OutgoingEmail, Guid>
    {
        List<OutgoingEmail> GetNext(int take);
        void MarkAsSent(Guid id);
        void Retry(Guid id, string info);
        void Requeue(Guid id);

    }

}
