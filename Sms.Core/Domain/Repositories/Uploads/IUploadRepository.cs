using Sms.Core.Domain.Entities.Uploads;

namespace Sms.Core.Domain.Repositories.Uploads
{
    public interface IUploadRepository : IRepositoryBase<Upload, Guid>
    {
        Task<List<Upload>> GetByReferenceIdAsync(Guid requestId);
    }


}
