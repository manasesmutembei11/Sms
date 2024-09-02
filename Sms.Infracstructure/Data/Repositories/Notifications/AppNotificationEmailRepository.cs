using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace Sms.Infrastructure.Data.Repositories.Notifications
{
    internal class AppNotificationEmailRepository : RepositoryBase<AppNotificationEmail, Guid>, IAppNotificationEmailRepository
    {
        public AppNotificationEmailRepository(AppDbContext context) : base(context)
        {
        }
    }
}
