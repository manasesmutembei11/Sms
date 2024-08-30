using Sms.Core.Domain.Entities.Uploads;
using Sms.Core.Domain.Paging;

namespace Sms.Core.Domain.Repositories.Uploads
{
    public interface IUploadConfigRepository : IRepositoryBase<UploadConfig, Guid>
    {
        Task<UploadConfig> GetByOperationTypeAsync(UploadOperation uploadOperation, Guid uploadTypeId);
        Task<List<UploadConfig>> GetByOperationTypesAsync(UploadOperation operation);
        Task<PagedList<UploadConfig>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }


}
