using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XpaAsva.Core.Domain.Entities.Masterdata;
using XpaAsva.Core.Domain.Entities.UserEntities;

namespace XpaAsva.Core.Domain.Repositories.Users
{
    public interface IUserSignatureRepository: IRepositoryBase<UserSignature, Guid>
    {
    }
}
