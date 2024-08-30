using Sms.Core.Domain.Entities.ReportEntities;
using Sms.Core.Domain.Paging;

namespace Sms.Core.Domain.Repositories.Reports
{
    public interface IReportGroupItemRepository : IRepositoryBase<ReportGroupItem, Guid>
    {
        Task<PagedList<ReportGroupItem>> GetPagedListAsync(ReportGroupItemPagingParameters pagingParameters, bool trackChanges);
    }
}
