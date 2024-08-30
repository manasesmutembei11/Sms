namespace Sms.Application.DTOs.Uploads
{
    public class DocumentUploadTypeDTO
    {
        public DocumentUploadTypeDTO()
        {
            Items = new List<DocumentUploadItemDTO>();
        }

        public int No { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public Guid Id { get; set; }
        public bool Mandatory { get; set; }
        public List<DocumentUploadItemDTO> Items { get; set; }
        public bool Status { get; set; }
        public Guid? UploadId { get; set; }
        public List<UploadMimeTypeDTO> MimeTypes { get; set; } = new List<UploadMimeTypeDTO>();
    }

}
