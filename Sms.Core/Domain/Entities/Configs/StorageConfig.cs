using System.ComponentModel.DataAnnotations;

namespace Sms.Core.Domain.Entities.Configs
{
    public class StorageConfig : ConfigBase
    {

        public override ConfigType ConfigType { get => ConfigType.Storage; }

        [Required]
        public string UploadPath { get; set; }

        [Required]
        public string OtherPath { get; set; }

        public string DocumentPath { get; set; }
    }

}
