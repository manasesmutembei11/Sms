using System.ComponentModel;

namespace Sms.Core.Domain.Entities.Configs
{
    public enum ConfigType
    {
        [Description("Report Server")]
        ReportServer = 1,
        [Description("Storage")]
        Storage = 2,
        [Description("Email Server")]
        EmailServer = 3,

        [Description("Third Party Claims")]
        ThirdPartyClaims = 4,
        [Description("ExpaqMate Server")]
        ExpaqMateServer = 5,
    }


}
