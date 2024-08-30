using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Entities.UserEntities;

namespace Sms.Core.Domain.Repositories.Users
{
    public interface IUserSignatureRepository: IRepositoryBase<UserSignature, Guid>
    {
    }
}
