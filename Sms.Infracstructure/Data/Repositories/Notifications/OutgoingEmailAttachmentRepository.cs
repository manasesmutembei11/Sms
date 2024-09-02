using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace XpaGIQ.Infrastructure.Data.Repositories.Notifications
{
    internal class OutgoingEmailAttachmentRepository : RepositoryBase<OutgoingEmailAttachment, Guid>, IOutgoingEmailAttachmentRepository
    {
        public OutgoingEmailAttachmentRepository(AppDbContext context) : base(context)
        {
        }
    }
}
