using Microsoft.EntityFrameworkCore;
using Sms.Core.Domain.Email;
using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Entities.Templates;
using Sms.Core.Domain.Repositories;

namespace Sms.Infrastructure.Email;

internal class EmailFactory : IEmailFactory
{
    private readonly IRepositoryManager _repository;
    public EmailFactory(
       IRepositoryManager repository
       )
    {
        _repository = repository;
    }
    public async Task<string> CreateEmailAsync(AppNotificationType notificationType, Dictionary<string, string> dataHolders)
    {
        var template = string.Empty;
        var notification = await _repository.NotificationEmail.FindByCondition(s => s.Notification.Type == notificationType, false).FirstOrDefaultAsync();
        if (notification == null)
        {
            return string.Empty;
        }
        template = notification.Template;
        if (string.IsNullOrWhiteSpace(template)) return string.Empty;
        foreach (var d in dataHolders)
        {
            template = template.Replace(d.Key, d.Value);
        }
        return template;
    }
}
