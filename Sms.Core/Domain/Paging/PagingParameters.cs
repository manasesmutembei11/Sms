

namespace Sms.Core.Domain.Paging
{
    public class PagingParameters : RequestParameters
    {
        public string Search { get; set; }

    }
    public class VehileModelPagingParameters : PagingParameters
    {
       public Guid? MakeId { get; set; }
    }
    public class VehileModelPartPagingParameters : PagingParameters
    {
        public Guid? ModelId { get; set; }
    }


}
