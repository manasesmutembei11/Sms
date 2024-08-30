using System.Security.Claims;
using XpaAsva.Core.Domain.Entities.UserEntities;

namespace XpaAsva.Application.Security
{
    public static class UserExtensions
    {
        public static bool IsInPermission(this ClaimsPrincipal user, string permission)
        {
            return user.Claims.Where(s => s.Type == CustomClaimTypes.Permission && s.Value == permission).Any();
            
        }
    }
}
