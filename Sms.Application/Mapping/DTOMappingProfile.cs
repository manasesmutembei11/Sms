using Autofac;
using AutoMapper;
using Sms.Application.DTOs.Masterdata;
using Sms.Application.DTOs.Reports;
using Sms.Application.DTOs.Templates;
using Sms.Application.DTOs.Uploads;
using Sms.Application.DTOs.Users;
using Sms.Core.Domain.Entities;
using Sms.Core.Domain.Entities.Configs;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Entities.ReportEntities;
using Sms.Core.Domain.Entities.Templates;
using Sms.Core.Domain.Entities.Uploads;
using Sms.Core.Domain.Entities.UserEntities;
using Sms.Core.Domain.Util;
using Sms.Presentation.DTOs.Configurations;

namespace Sms.Application.Mapping
{
    public class DTOMappingProfile : Profile
    {
        private readonly IComponentContext _componentContext;

        public DTOMappingProfile(IComponentContext componentContext)
        {
            _componentContext = componentContext;
            CreateMap<User, UserDTO>()
                .ReverseMap()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

            CreateMap<RegisterUserDTO, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
            CreateMap<ReportServerConfig, ReportServerConfigDTO>().ReverseMap();
            CreateMap<ExpaqMateServerConfig, ExpaqMateServerConfigDTO>().ReverseMap();
            CreateMap<StorageConfig, StorageConfigDTO>().ReverseMap();
            CreateMap<EmailConfiguration, EmailConfigurationDTO>().ReverseMap();
            CreateMap<ThirdPartyClaimConfig, ThirdPartyClaimConfigDTO>().ReverseMap();


            CreateMap<ReportGroup, ReportGroupDTO>().ReverseMap();
            CreateMap<ReportGroupItem, ReportGroupItemDTO>().ReverseMap();
            CreateMap<UploadType, UploadTypeDTO>().
                AfterMap(AfterMap)
                .ReverseMap();
            CreateMap<UploadConfig, UploadConfigDTO>()

                .ForMember(dest => dest.UploadTypeName, opt => opt.MapFrom(src => src.UploadType.Name))
                .ForMember(dest => dest.UploadTypeId, opt => opt.MapFrom(src => src.UploadType.Id))
                .ForMember(dest => dest.UploadOperation, opt => opt.MapFrom(src => src.OperationType))
                .ReverseMap()
                .ForMember(x => x.UploadType, opt => opt.Ignore());


            CreateMap<DocumentTemplate, DocumentTemplateDTO>()
                .ForMember(dest => dest.DocumentTemplateTypeName, opt => opt.MapFrom(src => src.DocumentTemplateType.ToDescription()));

            CreateMap<Asset, AssetDTO>().ReverseMap()
                .ForMember(x => x.Department, opt => opt.Ignore());

            CreateMap<Department, DepartmentDTO>().ReverseMap();
            CreateMap<County, CountyDTO>().ReverseMap();
            CreateMap<Discipline, DisciplineDTO>()
                  .ForMember(dest => dest.DisciplineActionName, opt => opt.MapFrom(src => src.Actions.ToDescription())).ReverseMap();
            CreateMap<Room, RoomDTO>()
                .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.FirstName)).ReverseMap()
                .ForMember(x => x.Student, opt => opt.Ignore());
            CreateMap<Staff, StaffDTO>()
               .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.Name))
               .ForMember(dest => dest.CountyName, opt => opt.MapFrom(src => src.County.Name)).ReverseMap()
               .ForMember(x => x.Department, opt => opt.Ignore())
               .ForMember(x => x.County, opt => opt.Ignore());
        }
            private void AfterMap(UploadType src, UploadTypeDTO dest)
            {
                var itemsIn = !string.IsNullOrWhiteSpace(src.FileExtensions) ? src.FileExtensions.Split('|').ToList() : new List<string>() { };
                if (itemsIn.Any())
                {
                    var types = UploadMimeTypes.MimeTypes.Where(s => itemsIn.Contains(s.Id.ToString())).Select(s => s.Name).ToList();
                    dest.AllowedFileTypes = string.Join("|", types);
                }

            }

        }






    
}
