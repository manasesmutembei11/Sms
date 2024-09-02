using Sms.Core.Domain.Repositories.Configs;
using Sms.Core.Domain.Repositories.Masterdata;
using Sms.Core.Domain.Repositories.Reports;
using Sms.Core.Domain.Repositories.Templates;
using Sms.Core.Domain.Repositories.Uploads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Repositories.Users;
using Sms.Core.Domain.Repositories.Notifications;

namespace Sms.Core.Domain.Repositories
{
    public interface IRepositoryManager
    {
        IUserSignatureRepository UserSignature { get; }
        IUserRepository User { get; }
        IReportGroupItemRepository ReportGroupItem { get; }
        IReportGroupRepository ReportGroup { get; }
        IUploadRepository Upload { get; }
        IUploadOtherRepository UploadOther { get; }
        IUploadTypeRepository UploadType { get; }
        IUploadConfigRepository UploadConfig { get; }
        IConfigRepository Config { get; }
        IDocumentTemplateRepository DocumentTemplate { get; }

        IAppNotificationRepository Notification { get; }
        IAppNotificationEmailRepository NotificationEmail { get; }
        IAppNotificationSmsRepository NotificationSms { get; }
        IAppNotificationSmsContactRepository NotificationSmsContact { get; }
        IAppNotificationEmailContactRepository NotificationEmailContact { get; }
        IOutgoingEmailRepository OutgoingEmail { get; }
        IOutgoingEmailAttachmentRepository OutgoingEmailAttachment { get; }
        IAppGroupContactRepository AppGroupContact { get; }

        IAssetRepository Asset {  get; }
        ICountyRepository County { get; }
        IDepartmentRepository Department { get; }
        IDisciplineRepository Discipline { get; }
        IRoomRepository Room { get; }
        IStaffRepository Staff { get; }
        IStudentRepository Student { get; }
        ISubjectRepository Subject { get; }
        ITeacherRepository Teacher { get; }

        Task SaveAsync();
    }
}
