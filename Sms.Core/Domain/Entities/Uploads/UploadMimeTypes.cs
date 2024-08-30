namespace Sms.Core.Domain.Entities.Uploads
{
    public static class UploadMimeTypes
    {
        public static List<UploadMimeType> MimeTypes
        {
            get
            {
                return new List<UploadMimeType>
                {
                    new UploadMimeType(1,"image/gif",".gif"),
                    new UploadMimeType(2,"image/jpeg",".jpeg .jpg"),
                    new UploadMimeType(3,"image/png",".png"),
                    new UploadMimeType(4, "application/pdf",".pdf"),
                    new UploadMimeType(5,"application/msword",".doc"),
                    new UploadMimeType(6,"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".docx"),
                    new UploadMimeType(7,"application/vnd.ms-excel",".xls"),
                    new UploadMimeType(8,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".xlsx"),
                    new UploadMimeType(9,"application/zip",".zip"),
                    new UploadMimeType(10,"application/x-7z-compressed",".7z"),
                    new UploadMimeType(11,"text/plain",".txt"),
                    new UploadMimeType(12,"text/csv",".csv"),
                };
            }
        }

    }
}
