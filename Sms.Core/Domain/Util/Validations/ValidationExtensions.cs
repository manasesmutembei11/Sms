using System.ComponentModel.DataAnnotations;

namespace Sms.Core.Domain.Util.Validations
{
    public static class ValidationExtensions
    {
        public static ValidationResultInfo BasicValidation<T>(this T itemToValidate)
        {
            ValidationContext vt = new ValidationContext(itemToValidate, null, null);
            List<ValidationResult> results = new List<ValidationResult>();
            Validator.TryValidateObject(itemToValidate, vt, results, true);
            return new ValidationResultInfo { Results = results };
        }
    }

}
