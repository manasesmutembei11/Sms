using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Entities
{
    public enum EntityStatus
    {
        Inactive = 0,
        Active = 1,
        Deleted = 2


    }
   
    public class BaseEntity<T>:IAuditable where T : IEquatable<T>
    {
        [Required]
        public T Id { get; set; }

        [Required]
        public DateTime CreatedOn { get; internal set; }
        public DateTime UpdatedOn { get; internal set; }
        [Required]
        public EntityStatus Status { get; internal set; }
    }
}
