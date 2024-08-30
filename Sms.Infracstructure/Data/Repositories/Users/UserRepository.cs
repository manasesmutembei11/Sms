using Microsoft.EntityFrameworkCore;
using Sms.Core.Domain.Entities.UserEntities;
using Sms.Core.Domain.Repositories.Users;
using Sms.Infrastructure.Data.EF;

namespace Sms.Infrastructure.Data.Repositories.Users
{
    internal class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context) 
        {
            _context = context;
        }

        public Task<User> GetByIdAsync(Guid id)
        {
            return _context.Set<User>().AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}
