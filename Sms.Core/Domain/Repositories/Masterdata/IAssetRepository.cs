using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Paging;

namespace Sms.Core.Domain.Repositories.Masterdata
{
    public interface IAssetRepository : IRepositoryBase <Asset, Guid>
    {
        Task<PagedList<Asset>> GetPagedListAsync(Expression<Func<Asset, bool>> expression, PagingParameters pagingParameters, bool trackChanges);
    }
}
