﻿using System.ComponentModel.DataAnnotations;

namespace Sms.Core.Domain.Util.Validations
{
    public class ValidationResultInfo
    {
        public ValidationResultInfo()
        {
            Results = new List<ValidationResult>();
        }

        public bool IsValid
        {
            get { return Results.Count() == 0; }
        }

        public List<ValidationResult> Results { get; set; }
    }

}
