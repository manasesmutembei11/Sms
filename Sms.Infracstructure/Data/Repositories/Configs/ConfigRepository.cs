using Sms.Core.Domain.Caching;
using Sms.Core.Domain.Entities.Configs;
using Sms.Core.Domain.Repositories.Configs;
using Sms.Core.Domain.Util;
using Sms.Infrastructure.Data.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;


namespace Sms.Infrastructure.Data.Repositories.Configs
{
    internal class ConfigRepository : IConfigRepository
    {
        private readonly AppDbContext _context;
        private readonly ICacheProvider _cacheProvider;

        public ConfigRepository(AppDbContext context, ICacheProvider cacheProvider)
        {
            _context = context;
            _cacheProvider = cacheProvider;
        }
        
        protected string _cacheKey
        {
            get { return "Config_{0}"; }
        }

      

        public async Task<T> Load<T>() where T : ConfigBase
        {
            var instance = (T)Activator.CreateInstance(typeof(T));
            T si = (T)_cacheProvider.Get(string.Format(_cacheKey, instance.ConfigType));  
            if(si == null)
            {
                var setting = await _context.Configs.Where(s => s.ConfigType == instance.ConfigType).FirstOrDefaultAsync();
                if (setting != null)
                {
                    si = JsonSerializer.Deserialize<T>(setting.Value);
                    _cacheProvider.Put(string.Format(_cacheKey, instance.ConfigType), si);
                }
            }           
           

            return si;
        }


        public void Save<T>(T config) where T : ConfigBase
        {
            var entity = new Config();
            entity.ConfigType = config.ConfigType;
            entity.Description = config.ConfigType.ToDescription();
            entity.Value = JsonSerializer.Serialize(config, config.GetType());
             Save(entity);
            _cacheProvider.Remove(string.Format(_cacheKey, config.ConfigType));
           
        }

        private  void Save(Config entity)
        {
            var config = _context.Configs.AsNoTracking().FirstOrDefault(s => s.ConfigType == entity.ConfigType);
            if (config == null)
            {
                entity.Id = Guid.NewGuid();
               _context.Configs.Add(entity);
            }
            else
            {
                entity.Id = config.Id;
                _context.Configs.Update(entity);
            }
            
        }
    }
}
