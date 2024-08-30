using Autofac.Core;
using Autofac;
using Sms.Core.Domain.Caching;
using Sms.Core.Domain.Repositories.Audit;
using Sms.Core.Domain.Repositories.Configs;
using Sms.Core.Domain.Repositories.Counters;
using Sms.Core.Domain.Repositories.Reports;
using Sms.Core.Domain.Repositories.Templates;
using Sms.Core.Domain.Repositories.Uploads;
using Sms.Core.Domain.Repositories.Masterdata;
using Sms.Core.Domain.Repositories;
using Sms.Infrastructure.Data.Repositories.Audit;
using Sms.Infrastructure.Data.Repositories.Configs;
using Sms.Infrastructure.Data.Repositories.Reports;
using Sms.Infrastructure.Data.Repositories.Templates;
using Sms.Infrastructure.Data.Repositories.Uploads;
using Sms.Infrastructure.Data.Repositories;
using Sms.Infrastructure.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Infrastructure.Data.Repositories.Counters;
using Sms.Infrastructure.Data.Repositories.Masterdata;

namespace Sms.Infrastructure.DI
{
    public class DataRepositoryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkdiXX5ecnJWRGNeV0U=");


            //reports
            builder.RegisterType<ReportGroupRepository>().As<IReportGroupRepository>();
            builder.RegisterType<ReportGroupItemRepository>().As<IReportGroupItemRepository>();
            builder.RegisterType<UploadOtherRepository>().As<IUploadOtherRepository>();
            builder.RegisterType<UploadRepository>().As<IUploadRepository>();
            builder.RegisterType<UploadTypeRepository>().As<IUploadTypeRepository>();
            builder.RegisterType<UploadConfigRepository>().As<IUploadConfigRepository>();
            builder.RegisterType<ConfigRepository>().As<IConfigRepository>();

            builder.RegisterType<AuditTrailRepository>().As<IAuditTrailRepository>();
            builder.RegisterType<AppCounterRepository>().As<IAppCounterRepository>().WithParameter(
                new ResolvedParameter(
                (pi, cc) => pi.Name == "context",
                (pi, cc) => cc.Resolve<ILifetimeScope>().BeginLifetimeScope().Resolve<AppDbContext>()
                ));
            //builder.RegisterType<ServiceForHandler>().InstancePerOwned<MessageHandler>();
            //services
            builder.RegisterType<DocumentTemplateRepository>().As<IDocumentTemplateRepository>();
            //masterdata repositories
            builder.RegisterType<AssetRepository>().As<IAssetRepository>();
            builder.RegisterType<CountyRepository>().As<ICountyRepository>();
            builder.RegisterType<DepartmentRepository>().As<IDepartmentRepository>();
            builder.RegisterType<DisciplineRepository>().As<IDisciplineRepository>();
            builder.RegisterType<RoomRepository>().As<IRoomRepository>();
            builder.RegisterType<StaffRepository>().As<IStaffRepository>();
            builder.RegisterType<StudentRepository>().As<IStudentRepository>();
            builder.RegisterType<SubjectRepository>().As<ISubjectRepository>();
            builder.RegisterType<TeacherRepository>().As<TeacherRepository>();
          
            //manager
            builder.RegisterType<RepositoryManager>().As<IRepositoryManager>();

            //services
















        }
    }
}
