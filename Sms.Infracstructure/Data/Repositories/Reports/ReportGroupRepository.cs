using Sms.Core.Domain.Entities.ReportEntities;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Reports;
using Sms.Infrastructure.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Infrastructure.Data.Repositories.Reports
{
    internal class ReportGroupRepository : RepositoryBase<ReportGroup, Guid>, IReportGroupRepository
    {
        public ReportGroupRepository(AppDbContext context) : base(context)
        {
        }

        public Task<PagedList<ReportGroup>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindAll(trackChanges).OrderBy(e => e.No);
            return PagedList<ReportGroup>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
    }
}
