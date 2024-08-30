using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Paging;

namespace Sms.Core.Domain.Repositories.Masterdata
{
    public interface IAssetRepository : IRepositoryBase <Asset, Guid>
    {
        Task<PagedList<Asset>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }
}
