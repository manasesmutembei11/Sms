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
using System.Linq.Expressions;

namespace Sms.Infrastructure.Data.Repositories.Masterdata
{
    internal class TeacherRepository : RepositoryBase<Teacher, Guid>, ITeacherRepository
    {
        public TeacherRepository(AppDbContext context) : base(context)
        {
        }
        public Task<PagedList<Teacher>> GetPagedListAsync(Expression<Func<Teacher, bool>> expression, PagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindByCondition(expression, trackChanges).OrderBy(s => s.FirstName);
            return PagedList<Teacher>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }
        public override void Delete(Teacher item)
        {
            var entity = GetById(item.Id);
            if (entity != null)
            {
                entity.Status = EntityStatus.Deleted;
            }
        }
    }
}
