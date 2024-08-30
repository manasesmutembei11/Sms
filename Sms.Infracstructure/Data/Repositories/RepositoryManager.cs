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
            Lazy<IDocumentTemplateRepository> documentTemplateRepository
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
        public Task SaveAsync()
        {
            _logger.LogDebug("SaveAsync");
            _auditTrailRepository.LogAuditTrail();
            return _context.SaveChangesAsync();
        }
    }
}
