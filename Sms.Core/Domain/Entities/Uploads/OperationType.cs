using System.ComponentModel;

namespace Sms.Core.Domain.Entities.Uploads
{
    public enum UploadOperation
    {
        [Description("FeeNote Creation")]
        FeeNoteCreation = 1,
        [Description("Assessment Task Creation")]
        AssessmentTaskCreation = 2,

        [Description("Assessment Report Creation")]
        AssessmentReportCreation = 3,





    }
}
