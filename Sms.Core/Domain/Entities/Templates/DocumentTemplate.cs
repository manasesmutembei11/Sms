using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities.Templates
{
    public enum DocumentTemplateType
    {
       

        [Description("Assessment Report Template")]
        AssessmentReportTemplate = 1,
        [Description("Fee Note Template")]
        FeeNoteTemplate = 2,
    }

    [Table("s_DocumentTemplates")]
    public class DocumentTemplate:BaseEntity<Guid>
    {
        public string Name { get; set; }
        public DocumentTemplateType DocumentTemplateType { get; set; }

        public string FileName { get; set; }
        public byte[] FileContent { get; set; }
    }
}
