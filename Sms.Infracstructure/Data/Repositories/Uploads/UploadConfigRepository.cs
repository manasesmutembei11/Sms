using Sms.Core.Domain.Entities.Uploads;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Uploads;
using Sms.Infrastructure.Data.EF;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Sms.Infrastructure.Data.Repositories.Uploads
{
    internal class UploadConfigRepository : RepositoryBase<UploadConfig, Guid>, IUploadConfigRepository
    {
        public UploadConfigRepository(AppDbContext context) : base(context)
        {
        }

        public Task<UploadConfig> GetByOperationTypeAsync(UploadOperation uploadOperation, Guid uploadTypeId)
        {
            return _context.UploadConfigs.AsNoTracking().FirstOrDefaultAsync(s => s.UploadTypeId == uploadTypeId && s.OperationType == uploadOperation);
        }

        public Task<List<UploadConfig>> GetByOperationTypesAsync(UploadOperation operation)
        {
            return _context.UploadConfigs.OrderByDescending(s=>s.IsRequired).ThenBy(s=>s.UploadType.Name)
                //.AsNoTracking()
               // .Include(s=>s.UploadType)
                .Where(s => s.OperationType == operation).ToListAsync();
        }

        public Task<PagedList<UploadConfig>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindAll(trackChanges).OrderBy(e => e.OperationType);
            return PagedList<UploadConfig>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
    }
}
