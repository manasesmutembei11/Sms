using System.ComponentModel.DataAnnotations;

namespace Sms.Core.Domain.Entities.Configs
{
    public class ReportServerConfig : ConfigBase
    {
        [Required]
        public string ReportServerUri { get; set; }
        [Required]
        public string ReportServerUsername { get; set; }
        [Required]
        public string ReportServerPassword { get; set; }
        public string Scheme { get; set; }
        public override ConfigType ConfigType { get => ConfigType.ReportServer; }
    }
}
