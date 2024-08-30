using LinqKit;
using Sms.Core.Domain.Entities;
using Sms.Core.Domain.Paging;
using Sms.Infrastructure.Data.EF;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Repositories.Masterdata;

namespace Sms.Infrastructure.Data.Repositories.Masterdata
{
    internal class AssetRepository : RepositoryBase<Asset, Guid>, IAssetRepository
    {
        public AssetRepository(AppDbContext context) : base(context)
        {
        }
        public Task<PagedList<Asset>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var predicate = PredicateBuilder.New<Asset>(true);
            if (!string.IsNullOrWhiteSpace(pagingParameters.Search))
            {
                predicate = predicate.And(s => s.Name.Contains(pagingParameters.Search) || s.Description.Contains(pagingParameters.Search));
            }
            var data = FindByCondition(predicate, trackChanges).OrderBy(s => s.Name);
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
