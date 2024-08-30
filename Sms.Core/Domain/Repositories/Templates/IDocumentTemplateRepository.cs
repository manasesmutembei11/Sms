using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Templates;
using Sms.Core.Domain.Paging;

namespace Sms.Core.Domain.Repositories.Templates
{
    public interface IDocumentTemplateRepository : IRepositoryBase<DocumentTemplate, Guid>
    {
        Task<DocumentTemplate> GetByDocumentTypeAsync(DocumentTemplateType documentTemplateType);
        Task<PagedList<DocumentTemplate>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges);
        Task<bool> TemplateExistAsync(DocumentTemplateType templateType);
    }
}
