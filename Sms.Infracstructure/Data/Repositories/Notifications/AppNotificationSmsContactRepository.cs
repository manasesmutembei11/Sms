using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace Sms.Infrastructure.Data.Repositories.Notifications
{
    internal class AppNotificationSmsContactRepository : RepositoryBase<AppNotificationSmsContact, Guid>, IAppNotificationSmsContactRepository
    {
        public AppNotificationSmsContactRepository(AppDbContext context) : base(context)
        {
        }

        public void RemoveAll(Guid notifcationId)
        {
            var all = FindByCondition(s => s.NotificationSmsId == notifcationId, true);
            foreach (var item in all)
            {
                Delete(item);
            }           
        }
    }
}
