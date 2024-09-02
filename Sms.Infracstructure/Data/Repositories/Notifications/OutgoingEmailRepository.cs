using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Repositories.Notifications;
using Sms.Infrastructure.Data.EF;
using Sms.Infrastructure.Data.Repositories;

namespace Sms.Infrastructure.Data.Repositories.Notifications
{
    internal class OutgoingEmailRepository : RepositoryBase<OutgoingEmail, Guid>, IOutgoingEmailRepository
    {
        public OutgoingEmailRepository(AppDbContext context) : base(context)
        {
        }

        public List<OutgoingEmail> GetNext(int take)
        {
            var date = DateTime.Now;
            var nexts = FindByCondition(s => !s.IsLocked && !s.IsSent && s.RetryCount < 3 && s.NextRetry < date,true).OrderBy(s => s.CreatedOn).ToList();
            foreach (var next in nexts)
            {
                next.IsLocked = true;
                next.ProcessingInfo = "-:>";
            }
            _context.SaveChanges();
            return nexts;
        }

        public void MarkAsSent(Guid id)
        {
            OutgoingEmail outgoingEmail = FindByCondition(s => s.Id == id,true).FirstOrDefault();
            if (outgoingEmail != null)
            {
                outgoingEmail.IsSent = true;
                outgoingEmail.ProcessingInfo = $"Sent";
                
            }
        }
        public void Retry(Guid id, string info)
        {
            DateTime date = DateTime.Now;
            OutgoingEmail email = FindByCondition(s => s.Id == id, true).FirstOrDefault();
            if (email != null)
            {
                email.UpdatedOn = date;
                email.ProcessingInfo = $"Marked for retry -:> {info}";
                email.RetryCount++;
                email.NextRetry = DateTime.Now.AddMinutes(10);
                email.IsLocked = false;
               
            }

        }
        public void Requeue(Guid id)
        {
            DateTime date = DateTime.Now;
            OutgoingEmail email = FindByCondition(s => s.Id == id, true).FirstOrDefault();
            if (email != null)
            {
                email.UpdatedOn = date;
                email.ProcessingInfo = $"requeued";
                email.RetryCount = 0;
                email.NextRetry = DateTime.Now;
                email.IsLocked = false;
                email.IsSent = false;
               
            }
        }
    }
}
