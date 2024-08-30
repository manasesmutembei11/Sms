using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Models.Imports
{
    public class InvalidImportHeaderException : Exception
    {
        public InvalidImportHeaderException(ImportError importError)
        {
            ImportError = importError;
        }
        public ImportError ImportError { get; }
    }
    public class InvalidImportDataException : Exception
    {
        public InvalidImportDataException(List<ImportError> importErrors)
        {
           
            ImportErrors = importErrors;
        }

        public List<ImportError> ImportErrors { get; }
    }
    public class ImportError
    {
        public string RowInfo { get; set; }
        public List<string> Errors { get; set; }= new List<string>();
    }
}
