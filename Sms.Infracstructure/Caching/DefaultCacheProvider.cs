using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Sms.Core.Domain.Caching;

namespace Sms.Infrastructure.Caching
{
    internal class DefaultCacheProvider : ICacheProvider
    {
        private readonly IMemoryCache _memoryCache;
        private readonly ILogger<DefaultCacheProvider> _logger;

        public DefaultCacheProvider(IMemoryCache memoryCache, ILogger<DefaultCacheProvider> logger)
        {
            _memoryCache = memoryCache;
            _logger = logger;
            _logger.LogDebug("create DefaultCacheProvider");
        }

        public object Get(string key)
        {
            return _memoryCache.Get(key);
        }

        public void Put(string key, object value)
        {
            var cacheOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(30));
            _memoryCache.Set(key, value, cacheOptions);
        }

        public void Remove(string key)
        {
             _memoryCache.Remove(key);
        }

        public void Put(string key, object value, TimeSpan? timeSpan)
        {
            if (timeSpan == null)
            {
                timeSpan = TimeSpan.FromMinutes(5);
            }
            var cacheOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(timeSpan.Value);
            _memoryCache.Set(key, value, cacheOptions);

        }
    }
}
