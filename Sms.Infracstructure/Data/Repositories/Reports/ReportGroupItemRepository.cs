using Sms.Core.Domain.Entities.ReportEntities;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Reports;
using Sms.Infrastructure.Data.EF;

namespace Sms.Infrastructure.Data.Repositories.Reports
{
    internal class ReportGroupItemRepository : RepositoryBase<ReportGroupItem, Guid>, IReportGroupItemRepository
    {
        public ReportGroupItemRepository(AppDbContext context) : base(context)
        {
        }

        public Task<PagedList<ReportGroupItem>> GetPagedListAsync(ReportGroupItemPagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindByCondition(s=>s.GroupId==pagingParameters.GroupId,trackChanges).OrderBy(e => e.No);
            return PagedList<ReportGroupItem>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
    }
}
