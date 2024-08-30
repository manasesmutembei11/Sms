namespace Sms.Application.DTOs.Uploads
{
    public class DocumentDownloadItemDTO
    {
        public string FileTypeName { get; set; }
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string RelativePath { get; set; }
        public string AbsolutePath { get; set; }
    }
    public class DocumentDownloadDTO
    {
        public DocumentDownloadDTO()
        {
            Items = new List<DocumentDownloadItemDTO>();
        }      
        
       
        public string OperationTypeName { get; set; }        
        public List<DocumentDownloadItemDTO> Items { get; set; }= new List<DocumentDownloadItemDTO>();
       
    }

}
