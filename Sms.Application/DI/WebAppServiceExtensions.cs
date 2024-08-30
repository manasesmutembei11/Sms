using Sms.Core.Domain.Entities.Settings;
using Sms.Core.Domain.Entities.UserEntities;
using Sms.Core.Domain.Managers;
using Sms.Infrastructure.Data.EF;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Sms.Core.Domain.Entities.Configs;
using Microsoft.AspNetCore.Builder;
using Autofac;
using Sms.Infrastructure.DI;
using Microsoft.Extensions.Hosting;
using Sms.Application.Security;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;

namespace Sms.Application.DI
{
    public static class WebAppServiceExtensions
    {
        public static void ConfigureAppAutofacModules(this IHostBuilder host)
        {
            host.ConfigureContainer<ContainerBuilder>(builder =>
            {
                builder.RegisterModule(new DataRepositoryModule());
                builder.RegisterModule(new WebAppModule());
            });

        }

      /*  public static void AddReportConfigurationServices(this IServiceCollection services)
        {
            IConfiguration configuration = services.BuildServiceProvider().GetService<IConfiguration>();
            var reportConfig = configuration.GetSection("ReportConfiguration").Get<ReportConfiguration>();
            services.AddSingleton(reportConfig);

        } */

        public static void AddIdentityServices(this IServiceCollection services)
        {
            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;

                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);

                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = true;
            })
                .AddUserManager<ApplicationUserManager>()
                .AddRoleManager<ApplicationRoleManager>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }

        public static void AddCookieAuthenticationServices(this IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();
        }
        public static void AddJwtAuthenticationServices(this IServiceCollection services)
        {

            IConfiguration configuration = services.BuildServiceProvider().GetService<IConfiguration>();
            var jwtSettings = configuration.GetSection("JwtSettings");
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                
                
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                    ValidAudience = jwtSettings.GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetSection("securityKey").Value))
                };
            })            
            .AddPolicyScheme("JWT_OR_APIKEY", "JWT_OR_APIKEY", options =>
               {
                   
                   options.ForwardDefaultSelector = context =>
                   {
                       string apikey = context.Request.Headers["X-API-KEY"];
                       if (!string.IsNullOrEmpty(apikey))
                       {
                           return ApiKeySchemeOptions.Scheme;
                       }
                       
                        return JwtBearerDefaults.AuthenticationScheme;
                   };
               }); ;

        }
        public static void AddApiKeyAuthentication(this IServiceCollection services)
        {
            // services.AddScoped<ApiKeySchemeHandler>();
            services.AddAuthentication(ApiKeySchemeOptions.Scheme)
               .AddScheme<ApiKeySchemeOptions, ApiKeySchemeHandler>(ApiKeySchemeOptions.Scheme, options =>
               {
                   options.HeaderName = "X-API-KEY";
               });


        }
    }
}
