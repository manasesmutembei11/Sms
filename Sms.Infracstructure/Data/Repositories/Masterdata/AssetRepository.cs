using LinqKit;
using Sms.Core.Domain.Entities;
using Sms.Core.Domain.Paging;
using Sms.Infrastructure.Data.EF;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Repositories.Masterdata;
using System.Linq.Expressions;

namespace Sms.Infrastructure.Data.Repositories.Masterdata
{
    internal class AssetRepository : RepositoryBase<Asset, Guid>, IAssetRepository
    {
        public AssetRepository(AppDbContext context) : base(context)
        {
        }
        public Task<PagedList<Asset>> GetPagedListAsync(Expression<Func<Asset, bool>> expression, PagingParameters pagingParameters, bool trackChanges)
        {
     
            var data = FindByCondition(expression, trackChanges).OrderBy(s => s.Name);
            return PagedList<Asset>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
        public override void Delete(Asset item)
        {
            var entity = GetById(item.Id);
            if (entity != null)
            {
                entity.Status = EntityStatus.Deleted;
            }
        }
    }
}
