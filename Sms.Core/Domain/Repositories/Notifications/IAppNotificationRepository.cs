using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Paging;

namespace Sms.Core.Domain.Repositories.Notifications
{

    public interface IAppNotificationRepository : IRepositoryBase<AppNotification, Guid>
    {
        Task<AppNotification> GetByTypeAsync(AppNotificationType notificationType);
        Task<PagedList<AppNotification>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }

}
