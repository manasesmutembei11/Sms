using Sms.Core.Domain.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Sms.Application.Util
{
   
    public class ValidationFailedResult : ObjectResult
    {
        public ValidationFailedResult(ModelStateDictionary modelState)
            : base(modelState)
        {
            var response = new BasicResponse();
            response.Message = "Validation Failed";
            modelState.Keys.SelectMany(key => modelState[key].Errors).ToList().ForEach(f => response.AddError(0, f.ErrorMessage));
            Value = response;
            StatusCode = StatusCodes.Status422UnprocessableEntity; //change the http status code to 422.
        }
    }

    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new ValidationFailedResult(context.ModelState);
            }
        }
    }
}
