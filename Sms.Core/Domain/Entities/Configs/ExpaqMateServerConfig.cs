using System.ComponentModel.DataAnnotations;

namespace Sms.Core.Domain.Entities.Configs
{
    public class ExpaqMateServerConfig : ConfigBase
    {
        [Required]
        public string ServerUri { get; set; }
                
        public override ConfigType ConfigType { get => ConfigType.ExpaqMateServer; }
    }
}
