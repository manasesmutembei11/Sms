using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Repositories;


namespace Sms.Core.Domain.Repositories.Notifications
{
    public interface IAppNotificationEmailContactRepository : IRepositoryBase<AppNotificationEmailContact, Guid>
    {
        void RemoveAll(Guid notifcationId);
    }

}
