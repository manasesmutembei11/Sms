﻿namespace Sms.Core.Domain.Entities.Configs
{
    public class EmailConfiguration:ConfigBase
    {
        public string From { get; set; }
        public string Name { get; set; }
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUserName { get; set; }
        public string SmtpPassword { get; set; }
        public override ConfigType ConfigType { get => ConfigType.EmailServer; }
      
    }
}
