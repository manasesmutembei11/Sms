using Autofac.Extensions.DependencyInjection;
using Autofac;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using NLog.Web;
using System.Net.Mime;
using System.Reflection;
using Sms.Core.Domain.Entities.Configs;
using Sms.Core.Domain.Entities.UserEntities;
using Sms.Core.Domain.Repositories.Configs;
using Sms.Infrastructure.Data.EF;
using NLog;
using Sms.Infrastructure.DI;
using Sms.Application.DI;
using Sms.Application.Mapping;
using Sms.Application.Util;
using Microsoft.AspNetCore.Authentication.Cookies;
using Sms.Web.Models;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//app.UseDefaultFiles();
//app.UseStaticFiles();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

//app.MapFallbackToFile("/index.html");

//app.Run();
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");
try
{


    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
    builder.Host.ConfigureContainer<ContainerBuilder>(
        builder =>
        {
            builder.RegisterModule(new DataRepositoryModule());
            builder.RegisterModule(new WebAppModule());
           // builder.RegisterModule(new DocumentModule());
        });

    //builder.Services.AddLogging(c => c.ClearProviders());

    builder.Services.AddControllers();
    var presentationAssembly = typeof(Sms.Application.AssemblyReference).Assembly;
    builder.Services.AddControllers().AddApplicationPart(presentationAssembly);

    builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new NullableDecimalConverter());
            });

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SchemaFilter<ExamplesSchemaFilter>();
    });

    var connectionString = builder.Configuration.GetConnectionString("DefaultAppConnection");
    builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseLazyLoadingProxies();
        options.UseSqlServer(connectionString);
    });
    //identity services
    builder.Services.AddIdentityServices();
    //jwt auth services

    builder.Services.AddCookieAuthenticationServices();
    builder.Services.AddJwtAuthenticationServices();
    builder.Services.AddApiKeyAuthentication();

    builder.Services.AddAuthorization(options =>
    {

        options.DefaultPolicy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .AddAuthenticationSchemes("JWT_OR_APIKEY", CookieAuthenticationDefaults.AuthenticationScheme)
            .Build();
        foreach (var permission in RolePermissions.ClaimPermissions)
        {
            options.AddPolicy(permission.Permission, policy =>
            {
                policy.RequireClaim(CustomClaimTypes.Permission, permission.Permission);
            });
        }
    });
    //report configuration services
  //  builder.Services.AddReportConfigurationServices();

    // add mapping
    builder.Services.AddAutoMapper((opt, s) =>
    {
        var context = opt.GetService<IComponentContext>();
        s.AddProfile(new DTOMappingProfile(context));
        // s.AddProfile(new OASDTOMappingProfile(context));
    }, Assembly.GetExecutingAssembly());

    builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var result = new ValidationFailedResult(context.ModelState);
            // TODO: add `using System.Net.Mime;` to resolve MediaTypeNames
            result.ContentTypes.Add(MediaTypeNames.Application.Json);
            return result;
        };
    });
    //cache
    builder.Services.AddMemoryCache();

    //background service
    // builder.Services.AddHostedService<PostAppTaskCompleteBackgroundService>();
    //builder.Services.AddHostedService<EmailHandlerBackgroundService>();
    //builder.Services.AddHttpClient<IExpaqMateService, ExpaqMateService>(async (serviceProvider, httpClient) =>
    //{
    //    var con = await serviceProvider.GetRequiredService<IConfigRepository>().Load<ExpaqMateServerConfig>();
    //    if (con != null)
    //    {
    //        httpClient.BaseAddress = new Uri(con.ServerUri);
    //        httpClient.DefaultRequestHeaders.Add("X-API-KEY", "A3AD61ED-60A5-429D-B3BD-221F140F76A2");
    //    }

    //});
    // Add services to the container.

    builder.Services.AddControllersWithViews();

    // NLog: Setup NLog for Dependency injection
    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    var app = builder.Build();

    app.MigrateDatabase();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {

        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }
    else
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpContext();
    app.UseHttpsRedirection();
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();


    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    app.MapFallbackToFile("index.html"); ;

    app.Run();
}
catch (Exception exception)
{
    // NLog: catch setup errors
    logger.Error(exception, "Stopped program because of exception");
    logger.Error(exception.StackTrace);

    throw;
}
finally
{
    // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
    NLog.LogManager.Shutdown();
}