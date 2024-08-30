using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Counters;
using Sms.Core.Domain.Repositories.Counters;
using Sms.Infrastructure.Data.EF;

namespace XpaAsva.Infrastructure.Data.Repositories.Counters
{
    internal class AppCounterRepository : IAppCounterRepository
    {
        private readonly AppDbContext _context;

        public AppCounterRepository(AppDbContext context)
        {
            _context = context;
        }
        public int GetCounter(CounterType type)
        {
            var counter = _context.Counters.FirstOrDefault(s => s.CounterType == type);
            if (counter == null)
            {
                counter = new AppCounter
                {
                    Value = 0,
                    CounterType = type,
                    Id = Guid.NewGuid()
                };
                _context.Counters.Add(counter);
            }
            counter.Value++; 
            _context.SaveChanges();
            return counter.Value;
        }
    }
}
