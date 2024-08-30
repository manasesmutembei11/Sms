using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Models.Documents
{
    public class AppDocument
    {
        public AppDocument(Stream stream, string fileName)
        {
            Stream = stream;
            FileName = fileName;
        }
    
        public Stream Stream { get; private  set; }
        public string FileName { get; private  set; }
    }
}
