using Microsoft.EntityFrameworkCore;
using Sms.Core.Domain.Entities.Uploads;
using Sms.Core.Domain.Repositories.Uploads;
using Sms.Infrastructure.Data.EF;

namespace Sms.Infrastructure.Data.Repositories.Uploads
{
    internal class UploadRepository : RepositoryBase<Upload, Guid>, IUploadRepository
    {
        public UploadRepository(AppDbContext context) : base(context)
        {
        }

        public Task<List<Upload>> GetByReferenceIdAsync(Guid requestId)
        {
            return _context.Set<Upload>().OrderByDescending(s => s.CreatedOn).Where(x => x.ReferenceId == requestId).ToListAsync();
        }
    }
}
