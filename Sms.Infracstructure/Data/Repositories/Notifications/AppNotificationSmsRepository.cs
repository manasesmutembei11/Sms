using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace Sms.Infrastructure.Data.Repositories.Notifications
{
    internal class AppNotificationSmsRepository : RepositoryBase<AppNotificationSms, Guid>, IAppNotificationSmsRepository
    {
        public AppNotificationSmsRepository(AppDbContext context) : base(context)
        {
        }
    }
}
