using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Email;

namespace Sms.Core.Domain.Entities.Notifications
{
    public enum AppContactType
    {
        [Description("User")]
        User = 1,
        [Description("Client")]
        Client = 2,
        [Description("Customer")]
        Customer = 3,
        [Description("Driver")]
        Driver = 4,



    }

    public class AppNotification : BaseEntity<Guid>
    {
        public string Description { get; set; }
        public AppNotificationType Type { get; set; }
        public bool EnableEmail { get; set; }
        public bool EnableSms { get; set; }
    }

}
