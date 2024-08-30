using Sms.Core.Domain.Entities.Uploads;

namespace Sms.Core.Domain.Repositories.Uploads
{
    public interface IUploadOtherRepository : IRepositoryBase<UploadOther, Guid>
    {
        Task<UploadOther> GetByReferenceIdAsync(Guid requestId);
    }


}
