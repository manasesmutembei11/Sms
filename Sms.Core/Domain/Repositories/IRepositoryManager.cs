using Sms.Core.Domain.Repositories.Masterdata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Core.Domain.Repositories
{
    public class IRepositoryManager
    {
        IAssetRepository Asset {  get; }
        ICountyRepository County { get; }
        IDepartmentRepository Department { get; }
        IDisciplineRepository Discipline { get; }
        IRoomRepository Room { get; }
        IStaffRepository Staff { get; }
        IStudentRepository Student { get; }
        ISubjectRepository Subject { get; }
        ITeacherRepository Teacher { get; } 
    }
}
