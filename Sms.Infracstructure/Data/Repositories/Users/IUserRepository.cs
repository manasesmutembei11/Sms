using Sms.Core.Domain.Entities.UserEntities;

namespace Sms.Core.Domain.Repositories.Users
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(Guid id);
    }
}
