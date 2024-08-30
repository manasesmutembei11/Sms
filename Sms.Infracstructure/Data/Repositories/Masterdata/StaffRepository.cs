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
    internal class StaffRepository : RepositoryBase<Staff, Guid>, IStaffRepository
    {
        public StaffRepository(AppDbContext context) : base(context)
        {
        }
        public Task<PagedList<Staff>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var predicate = PredicateBuilder.New<Staff>(true);
            if (!string.IsNullOrWhiteSpace(pagingParameters.Search))
            {
                predicate = predicate.And(s => s.Code.Contains(pagingParameters.Search) || s.FirstName.Contains(pagingParameters.Search));
            }
            var data = FindByCondition(predicate, trackChanges).OrderBy(s => s.FirstName);
            return PagedList<Staff>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
        public override void Delete(Staff item)
        {
            var entity = GetById(item.Id);
            if (entity != null)
            {
                entity.Status = EntityStatus.Deleted;
            }
        }
    }
}
