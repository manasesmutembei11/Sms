using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Entities.Templates;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Core.Domain.Util.Validations;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace Sms.Infrastructure.Data.Repositories.Notifications
{
    internal class AppNotificationRepository : RepositoryBase<AppNotification, Guid>, IAppNotificationRepository
    {
        public AppNotificationRepository(AppDbContext context) : base(context)
        {
        }
        public override ValidationResultInfo Validate(AppNotification itemToValidate)
        {

            ValidationResultInfo vri = itemToValidate.BasicValidation();

            bool hasDuplicate = FindByCondition(s => s.Id != itemToValidate.Id, false)
                .Any(p => p.Type == itemToValidate.Type);
            if (hasDuplicate)
                vri.Results.Add(new ValidationResult("Duplicate found"));


            return vri;
        }
        public Task<PagedList<AppNotification>> GetPagedListAsync(PagingParameters pagingParameters, bool trackChanges)
        {
            var data = FindAll(trackChanges).OrderBy(e => e.Type);
            return PagedList<AppNotification>.ToPagedListAsync(data, pagingParameters.PageNumber, pagingParameters.PageSize);
        }

        public Task<AppNotification> GetByTypeAsync(AppNotificationType notificationType)
        {
            return FindByCondition(s => s.Type == notificationType, false).FirstOrDefaultAsync();
        }
    }
}
