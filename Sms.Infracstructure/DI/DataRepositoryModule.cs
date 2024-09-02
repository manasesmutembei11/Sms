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
using Sms.Core.Domain.Repositories.Users;
using Sms.Infrastructure.Data.Repositories.Users;
using Sms.Core.Domain.Email;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Infrastructure.Data.Repositories.Notifications;
using Sms.Infrastructure.Email;
using Sms.Infrastructure.Caching;

namespace Sms.Infrastructure.DI
{
    public class DataRepositoryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkdiXX5ecnJWRGNeV0U=");

            builder.RegisterType<DefaultCacheProvider>().As<ICacheProvider>().SingleInstance();
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

            builder.RegisterType<AppNotificationRepository>().As<IAppNotificationRepository>();
            builder.RegisterType<AppNotificationEmailRepository>().As<IAppNotificationEmailRepository>();
            builder.RegisterType<AppNotificationSmsRepository>().As<IAppNotificationSmsRepository>();
            builder.RegisterType<AppNotificationSmsContactRepository>().As<IAppNotificationSmsContactRepository>();
            builder.RegisterType<AppNotificationEmailContactRepository>().As<IAppNotificationEmailContactRepository>();
            builder.RegisterType<OutgoingEmailRepository>().As<IOutgoingEmailRepository>();
            builder.RegisterType<OutgoingEmailAttachmentRepository>().As<IOutgoingEmailAttachmentRepository>();
            builder.RegisterType<AppGroupContactRepository>().As<IAppGroupContactRepository>();

            builder.RegisterType<EmailSender>().As<IEmailSender>();
            builder.RegisterType<EmailFactory>().As<IEmailFactory>();

            builder.RegisterType<UserSignatureRepository>().As<IUserSignatureRepository>();
            builder.RegisterType<UserRepository>().As<IUserRepository>();
            //masterdata repositories
            builder.RegisterType<AssetRepository>().As<IAssetRepository>();
            builder.RegisterType<CountyRepository>().As<ICountyRepository>();
            builder.RegisterType<DepartmentRepository>().As<IDepartmentRepository>();
            builder.RegisterType<DisciplineRepository>().As<IDisciplineRepository>();
            builder.RegisterType<RoomRepository>().As<IRoomRepository>();
            builder.RegisterType<StaffRepository>().As<IStaffRepository>();
            builder.RegisterType<StudentRepository>().As<IStudentRepository>();
            builder.RegisterType<SubjectRepository>().As<ISubjectRepository>();
            builder.RegisterType<TeacherRepository>().As<ITeacherRepository>();
          
            //manager
            builder.RegisterType<RepositoryManager>().As<IRepositoryManager>();

            //services

        }
    }
}
