using System.ComponentModel.DataAnnotations;
using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Core.Domain.Util.Validations;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace Sms.Infrastructure.Data.Repositories.Notifications
{
    internal class AppGroupContactRepository : RepositoryBase<AppGroupContact, Guid>, IAppGroupContactRepository
    {
        public AppGroupContactRepository(AppDbContext context) : base(context)
        {
        }
        public override ValidationResultInfo Validate(AppGroupContact itemToValidate)
        {

            ValidationResultInfo vri = itemToValidate.BasicValidation();

            bool hasDuplicate = FindByCondition(s => s.Id != itemToValidate.Id, false)
                .Any(p => p.ContactType == itemToValidate.ContactType);
            if (hasDuplicate)
                vri.Results.Add(new ValidationResult("Duplicate found"));


            return vri;
        }
        public Task<PagedList<AppGroupContact>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindAll(trackChanges).OrderByDescending(e => e.ContactType);
            return PagedList<AppGroupContact>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }

    }
}
