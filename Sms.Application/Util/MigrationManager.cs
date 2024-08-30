using Sms.Infrastructure.Data.EF;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Sms.Application.Util
{
   
    public static class MigrationManager
    {
        public static WebApplication MigrateDatabase(this WebApplication webApp)
        {
            using (var scope = webApp.Services.CreateScope())
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("MigrationManager");

                using (var appContext = scope.ServiceProvider.GetRequiredService<AppDbContext>())
                {
                   
                    try
                    {
                        logger.LogDebug("Start migration");
                        appContext.Database.Migrate();
                        logger.LogDebug("Copleted migration");
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "Migration Error");
                        //Log errors or do anything you think it's needed
                        throw;
                    }
                }
            }
            return webApp;
        }
    }
}
