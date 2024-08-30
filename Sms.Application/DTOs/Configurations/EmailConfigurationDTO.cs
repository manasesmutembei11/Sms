namespace Sms.Presentation.DTOs.Configurations
{
    public class EmailConfigurationDTO : ConfigBaseDTO
    {
        public string From { get; set; }
        public string Name { get; set; }
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUserName { get; set; }
        public string SmtpPassword { get; set; }


    }
}
