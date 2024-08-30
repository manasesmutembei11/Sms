using Sms.Core.Domain.Entities.ReportEntities;
using Sms.Core.Domain.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Repositories.Reports
{
    public interface IReportGroupRepository:IRepositoryBase<ReportGroup, Guid>
    {
        Task<PagedList<ReportGroup>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }
}
