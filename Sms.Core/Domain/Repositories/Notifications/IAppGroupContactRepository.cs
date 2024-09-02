using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories;

namespace Sms.Core.Domain.Repositories.Notifications
{
    public interface IAppGroupContactRepository : IRepositoryBase<AppGroupContact, Guid>
    {
   
        Task<PagedList<AppGroupContact>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }

}
