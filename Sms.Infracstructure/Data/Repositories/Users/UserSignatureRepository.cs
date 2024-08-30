using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Entities.UserEntities;
using Sms.Core.Domain.Repositories.Users;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace Sms.Infrastructure.Data.Repositories.Users
{
    internal class UserSignatureRepository : RepositoryBase<UserSignature, Guid>, IUserSignatureRepository
    {
        public UserSignatureRepository(AppDbContext context) : base(context)
        {
        }
    }
}
