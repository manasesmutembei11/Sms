using LinqKit;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Entities;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Masterdata;
using Sms.Infrastructure.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Infrastructure.Data.Repositories.Masterdata
{
    internal class CountyRepository : RepositoryBase<County, Guid>, ICountyRepository
    {
        public CountyRepository(AppDbContext context) : base(context)
        {
        }
        public Task<PagedList<County>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var predicate = PredicateBuilder.New<County>(true);
            if (!string.IsNullOrWhiteSpace(pagingParameters.Search))
            {
                predicate = predicate.And(s => s.Name.Contains(pagingParameters.Search) || s.Code.Contains(pagingParameters.Search));
            }
            var data = FindByCondition(predicate, trackChanges).OrderBy(s => s.Code);
            return PagedList<County>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
        public override void Delete(County item)
        {
            var entity = GetById(item.Id);
            if (entity != null)
            {
                entity.Status = EntityStatus.Deleted;
            }
        }
    }
}
