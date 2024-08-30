
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Entities.UserEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Managers
{
    public class ApplicationRoleManager : RoleManager<Role>
    {
        public ApplicationRoleManager(
            IRoleStore<Role> store,
            IEnumerable<IRoleValidator<Role>> roleValidators,
            ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors,
            ILogger<RoleManager<Role>> logger
            ) : base(store, roleValidators, keyNormalizer, errors, logger)
        {
        }
        public async Task<PagedList<Role>> GetPagedRolesAsync(PagingParameters pagingParameters, bool trackChanges)
        {

            return await Task.Run(() =>
             {
                 var roles = Roles.OrderBy(e => e.Name).ToList();
                 return PagedList<Role>.ToPagedList(roles, pagingParameters.PageNumber, pagingParameters.PageSize);
             });

        }
    }
}
