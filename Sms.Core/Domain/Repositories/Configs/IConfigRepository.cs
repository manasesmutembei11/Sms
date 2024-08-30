using Sms.Core.Domain.Entities.Configs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Repositories.Configs
{
    public interface IConfigRepository
    {
        void Save<T>(T entity) where T : ConfigBase;
        Task<T> Load<T>() where T : ConfigBase;
    }
}
