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
    public interface IStudentRepository : IRepositoryBase<Student, Guid>
    {
        Task<PagedList<Student>> GetPagedListAsync(Expression<Func<Student, bool>> expression, PagingParameters pagingParameters, bool trackChanges);
    }
}
