﻿using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Repositories.Masterdata
{
    public interface ICountyRepository : IRepositoryBase<County, Guid>
    {
        Task<PagedList<County>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
    }
}
