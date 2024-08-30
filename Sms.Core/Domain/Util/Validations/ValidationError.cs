namespace Sms.Core.Domain.Util.Validations
{
    public class ValidationError
    {

        // [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int Code { get; set; }
        public string Message { get; }
        public ValidationError(int code, string message)
        {
            Code = code != 0 ? code : 55;  //set the default code to 55. you can remove it or change it to 400.
            Message = message;
        }
    }

}
