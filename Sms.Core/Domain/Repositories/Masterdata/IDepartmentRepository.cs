﻿using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Repositories.Masterdata
{
    public interface IDepartmentRepository : IRepositoryBase<Department, Guid>
    {
        Task<PagedList<Department>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }
}
