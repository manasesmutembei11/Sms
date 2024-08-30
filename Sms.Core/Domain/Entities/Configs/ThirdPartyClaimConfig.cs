using System.ComponentModel.DataAnnotations;

namespace Sms.Core.Domain.Entities.Configs
{
    public class ThirdPartyClaimConfig : ConfigBase
    {

        public override ConfigType ConfigType { get => ConfigType.ThirdPartyClaims; }

        [Required]
        public Guid TracingClaimNatureID { get; set; }
    }

}
