using Sms.Core.Domain.Entities.UserEntities;
using System.Collections.Generic;
using static Sms.Core.Domain.Entities.UserEntities.Permissions;

namespace Sms.Core.Domain.Entities.UserEntities
{
    public class RolePermissions
    {
        public static List<RoleClaimPermission> ClaimPermissions
        {
            get
            {
                var permissions = new List<RoleClaimPermission>();
                //users
                permissions.Add(new RoleClaimPermission(Permissions.Menu.UserManagement, "User management menu", "USER MANAGEMENT"));               
                permissions.Add(new RoleClaimPermission(Permissions.Users.Edit, "Edit system users", "USER MANAGEMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.Users.View, "View system users", "USER MANAGEMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.Users.Activate, "Activate system users", "USER MANAGEMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.Users.Roles, "Add, Edit and View system roles", "USER MANAGEMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.Users.Permissiion, "Access permissions", "USER MANAGEMENT"));
                //masterdata
                permissions.Add(new RoleClaimPermission(Permissions.Menu.MasterData, "Master data menu", "MASTER DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.MasterData.Add, "Add  masterdata", "MASTER DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.MasterData.Edit, "Edit  masterdata", "MASTER DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.MasterData.View, "View  masterdata", "MASTER DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.MasterData.Delete, "Delete  masterdata", "MASTER DATA"));

                //masterdata:vehicle
                permissions.Add(new RoleClaimPermission(Permissions.Menu.VehicleMasterData, "Master Vehicle data menu", "VEHICLE DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.VehicleMasterData.Add, "Add vehicle  masterdata", "VEHICLE DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.VehicleMasterData.Edit, "Edit vehicle masterdata", "VEHICLE DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.VehicleMasterData.Import, "Import vehicle masterdata", "VEHICLE DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.VehicleMasterData.AddPart, "Add vehicle part", "VEHICLE DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.VehicleMasterData.View, "View vehicle masterdata", "VEHICLE DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.VehicleMasterData.Delete, "Delete vehicle  masterdata", "VEHICLE DATA"));

                //masterdata:account                
                permissions.Add(new RoleClaimPermission(Permissions.AccountMasterData.Add, "Add Account  masterdata", "MASTER DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.AccountMasterData.Edit, "Edit Account masterdata", "MASTER DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.AccountMasterData.View, "View Account masterdata", "MASTER DATA"));
                permissions.Add(new RoleClaimPermission(Permissions.AccountMasterData.Delete, "Delete Account  masterdata", "MASTER DATA"));

                //setting
                permissions.Add(new RoleClaimPermission(Permissions.Menu.Setting, "Setting  menu", "SETTINGS"));
                permissions.Add(new RoleClaimPermission(Permissions.Setting.View, "View settings", "SETTINGS"));
                permissions.Add(new RoleClaimPermission(Permissions.Setting.Update, "Update settings", "SETTINGS"));

                //Reports
                permissions.Add(new RoleClaimPermission(Permissions.Menu.Report, "Report  menu", "REPORTS"));
                permissions.Add(new RoleClaimPermission(Permissions.Report.Dashboard, "Report Dashboard", "REPORTS"));
                permissions.Add(new RoleClaimPermission(Permissions.Report.ReportViewer, "Report Viewer", "REPORTS"));


                //app task
                permissions.Add(new RoleClaimPermission(Permissions.Menu.AppTask, "Task menu", "TASK"));
                permissions.Add(new RoleClaimPermission(Permissions.AppTaskPermision.Add, "Add Task", "TASK"));
                permissions.Add(new RoleClaimPermission(Permissions.AppTaskPermision.Edit, "Edit task", "TASK"));
                permissions.Add(new RoleClaimPermission(Permissions.AppTaskPermision.ViewAll, "View all task", "TASK"));
                permissions.Add(new RoleClaimPermission(Permissions.AppTaskPermision.View, "View task", "TASK"));
                permissions.Add(new RoleClaimPermission(Permissions.AppTaskPermision.Delete, "Delete task", "TASK"));

                

                //assessment 
                permissions.Add(new RoleClaimPermission(Permissions.Menu.Assessment, "Assessment menu", "ASSESSMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.AssessmentPermision.Add, "Add Assessment", "ASSESSMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.AssessmentPermision.Edit, "Edit Assessment", "ASSESSMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.AssessmentPermision.View, "View Assessment", "ASSESSMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.AssessmentPermision.ViewAll, "View all assessment", "ASSESSMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.AssessmentPermision.Review, "Review assessment", "ASSESSMENT"));
                permissions.Add(new RoleClaimPermission(Permissions.AssessmentPermision.Delete, "Delete Assessment", "ASSESSMENT"));




                //invoicing

                permissions.Add(new RoleClaimPermission(Permissions.Menu.Invoice, "Invoicing menu", "INVOICING"));
                permissions.Add(new RoleClaimPermission(Permissions.Invoicing.Add, "Add Invoice", "INVOICING"));
                permissions.Add(new RoleClaimPermission(Permissions.Invoicing.Edit, "Edit Invoice", "INVOICING"));
                permissions.Add(new RoleClaimPermission(Permissions.Invoicing.View, "View Invoices", "INVOICING"));
                permissions.Add(new RoleClaimPermission(Permissions.Invoicing.Process, "Process Invoices", "INVOICING"));
                permissions.Add(new RoleClaimPermission(Permissions.Invoicing.Delete, "Delete Invoice", "INVOICING"));


             

                return permissions;
            }
        }
    }
}
