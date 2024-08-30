using Sms.Core.Domain.Entities.ReportEntities;
using Sms.Core.Domain.Entities.Uploads;
using Sms.Core.Domain.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;

namespace Sms.Core.Domain.Repositories.Uploads
{


    public interface IUploadTypeRepository : IRepositoryBase<UploadType, Guid>
    {
        Task<UploadType> GetByCodeAsyc(string code);
        Task<PagedList<UploadType>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }


}
