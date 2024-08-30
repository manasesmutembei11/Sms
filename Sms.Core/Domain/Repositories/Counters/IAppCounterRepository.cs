using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Counters;

namespace Sms.Core.Domain.Repositories.Counters
{
    public interface IAppCounterRepository
    {
        int GetCounter(CounterType type);
    }
}
