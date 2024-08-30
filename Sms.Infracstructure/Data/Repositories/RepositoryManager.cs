using Microsoft.Extensions.Logging;
using Sms.Core.Domain.Repositories;
using Sms.Infrastructure.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Repositories.Audit;
using Sms.Core.Domain.Repositories.Configs;
using Sms.Core.Domain.Repositories.Templates;
using Sms.Core.Domain.Repositories.Uploads;
using Sms.Core.Domain.Repositories.Reports;
using Sms.Core.Domain.Repositories.Users;
using Sms.Core.Domain.Repositories.Masterdata;

namespace Sms.Infrastructure.Data.Repositories
{
    internal class RepositoryManager : IRepositoryManager
    {
        private readonly ILogger<RepositoryManager> _logger;
        private readonly AppDbContext _context;
        private readonly IAuditTrailRepository _auditTrailRepository;
        private readonly Lazy<IUserSignatureRepository> _userSignatureRepository;
        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IReportGroupItemRepository> _reportGroupItemRepository;
        private readonly Lazy<IReportGroupRepository> _reportGroupRepository;
        private readonly Lazy<IUploadRepository> _uploadRepository;
        private readonly Lazy<IUploadOtherRepository> _uploadOtherRepository;
        private readonly Lazy<IUploadTypeRepository> _uploadTypeRepository;
        private readonly Lazy<IUploadConfigRepository> _uploadConfigRepository;
        private readonly Lazy<IConfigRepository> _configRepository;
        private readonly Lazy<IDocumentTemplateRepository> _documentTemplateRepository;

        private readonly Lazy<IAssetRepository> _assetRepository;
        private readonly Lazy<ICountyRepository> _countyRepository;
        private readonly Lazy<IDepartmentRepository> _departmentRepository;
        private readonly Lazy<IDisciplineRepository> _dicsiplineRepository;
        private readonly Lazy<IRoomRepository> _roomRepository;
        private readonly Lazy<IStaffRepository> _staffRepository;
        private readonly Lazy<IStudentRepository> _studentRepository;
        private readonly Lazy<ISubjectRepository> _subjectRepository;
        private readonly Lazy<ITeacherRepository> _teacherRepository;

        public RepositoryManager(
            ILogger<RepositoryManager> logger,
            AppDbContext context,
            IAuditTrailRepository auditTrailRepository,
             Lazy<IUserSignatureRepository> userSignatureRepository,
             Lazy<IUserRepository> userRepository,
            Lazy<IReportGroupItemRepository> reportGroupItemRepository,
            Lazy<IReportGroupRepository> reportGroupRepository,
            Lazy<IUploadRepository> uploadRepository,
            Lazy<IUploadOtherRepository> uploadOtherRepository,
            Lazy<IUploadTypeRepository> uploadTypeRepository,
            Lazy<IUploadConfigRepository> uploadConfigRepository,
            Lazy<IConfigRepository> configRepository,
            Lazy<IDocumentTemplateRepository> documentTemplateRepository,

            Lazy<IAssetRepository> assetRepository,
            Lazy<ICountyRepository> countyRepository,
            Lazy<IDepartmentRepository> departmentRepository,
            Lazy<IDisciplineRepository> disciplineRepository,
            Lazy<IRoomRepository> roomRepository,
            Lazy<IStaffRepository> staffRepository,
            Lazy<IStudentRepository> studentRepository,
            Lazy<ISubjectRepository> subjectRepository,
            Lazy<ITeacherRepository> teacherRepository
            )
        {
            _logger = logger;
            _context = context;
            _auditTrailRepository = auditTrailRepository;
            _reportGroupItemRepository = reportGroupItemRepository;
            _reportGroupRepository = reportGroupRepository;
            _uploadRepository = uploadRepository;
            _uploadOtherRepository = uploadOtherRepository;
            _uploadTypeRepository = uploadTypeRepository;
            _uploadConfigRepository = uploadConfigRepository;
            _configRepository = configRepository;
            _documentTemplateRepository = documentTemplateRepository;
            _userSignatureRepository = userSignatureRepository;
            _userRepository = userRepository;

            _assetRepository = assetRepository;
            _countyRepository = countyRepository;
            _departmentRepository = departmentRepository;
            _dicsiplineRepository = disciplineRepository;
            _roomRepository = roomRepository;
            _staffRepository = staffRepository;
            _studentRepository = studentRepository;
            _subjectRepository = subjectRepository;
            _teacherRepository = teacherRepository;
        }

        public IReportGroupItemRepository ReportGroupItem => _reportGroupItemRepository.Value;
        public IReportGroupRepository ReportGroup => _reportGroupRepository.Value;
        public IUploadRepository Upload => _uploadRepository.Value;
        public IUploadOtherRepository UploadOther => _uploadOtherRepository.Value;
        public IUploadTypeRepository UploadType => _uploadTypeRepository.Value;
        public IUploadConfigRepository UploadConfig => _uploadConfigRepository.Value;
        public IConfigRepository Config => _configRepository.Value;
        public IDocumentTemplateRepository DocumentTemplate => _documentTemplateRepository.Value;
        public IUserSignatureRepository UserSignature => _userSignatureRepository.Value;
        public IUserRepository User => _userRepository.Value;

        public IAssetRepository Asset => _assetRepository.Value;
        public ICountyRepository County => _countyRepository.Value;
        public IDepartmentRepository Department => _departmentRepository.Value;
        public IDisciplineRepository Discipline => _dicsiplineRepository.Value;
        public IRoomRepository Room => _roomRepository.Value;
        public IStaffRepository Staff => _staffRepository.Value;
        public IStudentRepository Student => _studentRepository.Value;
        public ISubjectRepository Subject => _subjectRepository.Value;
        public ITeacherRepository Teacher => _teacherRepository.Value;
        public Task SaveAsync()
        {
            _logger.LogDebug("SaveAsync");
            _auditTrailRepository.LogAuditTrail();
            return _context.SaveChangesAsync();
        }
    }
}
