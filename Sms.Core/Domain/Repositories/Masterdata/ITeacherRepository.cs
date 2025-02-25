using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Repositories.Masterdata
{
    public interface ITeacherRepository : IRepositoryBase<Teacher, Guid>
    {
        Task<PagedList<Teacher>> GetPagedListAsync(Expression<Func<Teacher, bool>> expression, PagingParameters pagingParameters, bool trackChanges);
    }
}
