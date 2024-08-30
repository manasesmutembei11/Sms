namespace Sms.Application.DTOs.Uploads
{
    public class UploadMimeTypeDTO
    {
        public UploadMimeTypeDTO(int Id, string type, string name)
        {
            Type = type;
            this.Id = Id;
            Name = name;
        }


        public string Type { get; private set; }
        public int Id { get; private set; }
        public string Name { get; private set; }
        public bool Checked { get; set; }
    }

}
