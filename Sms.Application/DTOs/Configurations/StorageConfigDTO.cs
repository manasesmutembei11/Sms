using System.ComponentModel.DataAnnotations;
using Sms.Core.Domain.Entities.Configs;

namespace Sms.Presentation.DTOs.Configurations
{
    public class StorageConfigDTO : ConfigBaseDTO
    {



        [Required]
        public string UploadPath { get; set; }

        [Required]
        public string OtherPath { get; set; }
        [Required]
        public string DocumentPath { get; set; }
    }



}
