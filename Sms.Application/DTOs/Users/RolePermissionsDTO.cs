﻿namespace Sms.Application.DTOs.Users
{
    public class RolePermissionsDTO
    {
        public RolePermissionsDTO()
        {
            RoleModules = new List<RoleModulePermissionDTO>();
        }
        public Guid RoleId { get; set; }
        public string RoleName { get; set; }
        public List<RoleModulePermissionDTO> RoleModules { get; set; }

    }

    public class RoleModulePermissionDTO
    {
        public RoleModulePermissionDTO()
        {
            Permissions = new List<PermissionDTO>();
        }
        public string Name { get; set; }
        public List<PermissionDTO> Permissions { get; set; }
    }
    public class PermissionDTO
    {
        public string Name { get; set; }
        public bool CanAccess { get; set; }
        public string Description { get; set; }
    }

}
