using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Core.Domain.Repositories.Notifications
{
    public interface IAppNotificationSmsContactRepository : IRepositoryBase<AppNotificationSmsContact, Guid>
    {
        void RemoveAll(Guid id);
    }

}
