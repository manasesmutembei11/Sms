using XpaAsva.Core.Domain.Entities.UserEntities;

namespace XpaAsva.Core.Domain.Repositories.Users
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(Guid id);
    }
}
