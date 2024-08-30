using Microsoft.EntityFrameworkCore;
using Sms.Core.Domain.Entities.Uploads;
using Sms.Core.Domain.Repositories.Uploads;
using Sms.Infrastructure.Data.EF;

namespace Sms.Infrastructure.Data.Repositories.Uploads
{
    internal class UploadOtherRepository : RepositoryBase<UploadOther, Guid>, IUploadOtherRepository
    {
        public UploadOtherRepository(AppDbContext context) : base(context)
        {
        }

        public Task<UploadOther> GetByReferenceIdAsync(Guid requestId)
        {
            return _context.Set<UploadOther>().OrderByDescending(s=>s.CreatedOn).FirstOrDefaultAsync(x => x.ReferenceId == requestId);
        }
    }
}
