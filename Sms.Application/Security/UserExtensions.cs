using System.Security.Claims;
using Sms.Core.Domain.Entities.UserEntities;

namespace Sms.Application.Security
{
    public static class UserExtensions
    {
        public static bool IsInPermission(this ClaimsPrincipal user, string permission)
        {
            return user.Claims.Where(s => s.Type == CustomClaimTypes.Permission && s.Value == permission).Any();
            
        }
    }
}
