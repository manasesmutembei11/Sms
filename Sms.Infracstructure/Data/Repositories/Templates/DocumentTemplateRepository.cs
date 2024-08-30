using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sms.Core.Domain.Entities.Templates;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Templates;
using Sms.Infrastructure.Data.EF;

namespace Sms.Infrastructure.Data.Repositories.Templates
{
    internal class DocumentTemplateRepository : RepositoryBase<DocumentTemplate, Guid>, IDocumentTemplateRepository
    {
        public DocumentTemplateRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<DocumentTemplate> GetByDocumentTypeAsync(DocumentTemplateType documentTemplateType)
        {
            var entity = await _context.DocumentTemplates.AsNoTracking().FirstOrDefaultAsync(s=>s.DocumentTemplateType==documentTemplateType);            
            return entity;
        }

        public Task<PagedList<DocumentTemplate>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindAll(trackChanges).OrderByDescending(e => e.Name);
            return PagedList<DocumentTemplate>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }

        public Task<bool> TemplateExistAsync(DocumentTemplateType templateType)
        {
            return  _context.DocumentTemplates.AsNoTracking().AnyAsync(s => s.DocumentTemplateType == templateType);
        }
    }
}
