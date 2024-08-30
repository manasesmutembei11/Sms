namespace Sms.Core.Domain.Util.Validations
{
    public class DomainValidationException : Exception
    {
        public DomainValidationException(ValidationResultInfo vri, string msg)
            : base(msg)
        {
            ValidationResult = vri;
        }
        public ValidationResultInfo ValidationResult { get; set; }
    }

}
