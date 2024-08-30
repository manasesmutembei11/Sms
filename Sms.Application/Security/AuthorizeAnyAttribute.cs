using Microsoft.AspNetCore.Authorization;

namespace Sms.Application.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class AuthorizeXXAnyAttribute : AuthorizeAttribute
    {

        public string[] Policies { get; }

        public AuthorizeXXAnyAttribute(params string[] policies) : base(String.Join(",", policies))
            => Policies = policies;
    }
}
