namespace Sms.Application.DTOs.Reports
{
    public class ReportConfigurationDTO
    {
        public string ReportViewerUri { get; set; }
        public string Name { get; set; }
        public string ReportInfo { get; set; }
    }

    public class ReportInfoParameterDTO
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
    public class ReportInfoDTO
    {
        public ReportInfoDTO()
        {
            Parameters= new List<ReportInfoParameterDTO>();
        }
        public string ReportUrl { get; set; }
        public string ReportServer { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Guid? StationId { get; set; }
        public Guid? CountyId { get; set; }
        public Guid? MareaId { get; set; }
        public Guid? WarehouseId { get;  set; }

        public List<ReportInfoParameterDTO> Parameters { get;set; }
    }

        public class ReportGroupItemDTO
    {
        public Guid Id { get; set; }
        public int No { get; set; }
        public string Name { get; set; }
        public string ReportUrl { get; set; }
        public Guid GroupId { get; set; }
    }
}
