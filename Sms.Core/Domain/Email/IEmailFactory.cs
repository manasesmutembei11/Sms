using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Entities.Notifications;

namespace Sms.Core.Domain.Email
{
    public interface IEmailFactory
    {

        Task<string> CreateEmailAsync(AppNotificationType notificationType, Dictionary<string, string> dataHolders);
    }
}
