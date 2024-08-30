namespace Sms.Core.Domain.Entities.Uploads
{
    public class UploadMimeType
    {
        public UploadMimeType(int id, string type, string name)
        {
            Id = id;
            Type = type;
            Name = name;
        }

        public int Id { get; }
        public string Type { get; set; }
        public string Name { get; set; }

    }
}
