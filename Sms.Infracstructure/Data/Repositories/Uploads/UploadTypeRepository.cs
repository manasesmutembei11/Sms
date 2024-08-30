using Sms.Core.Domain.Entities.ReportEntities;
using Sms.Core.Domain.Entities.Uploads;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Uploads;
using Sms.Infrastructure.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Sms.Infrastructure.Data.Repositories.Uploads
{
    internal class UploadTypeRepository : RepositoryBase<UploadType, Guid>, IUploadTypeRepository
    {
        public UploadTypeRepository(AppDbContext context) : base(context)
        {
        }

        public Task<UploadType> GetByCodeAsyc(string code)
        {
            return FindByCondition(f=>f.Code == code,false).FirstOrDefaultAsync();
        }

        public Task<PagedList<UploadType>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindAll(trackChanges).OrderBy(e => e.Name);
            return PagedList<UploadType>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
    }
}
