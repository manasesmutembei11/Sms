
using Sms.Core.Domain.Entities.UserEntities;

namespace Sms.Application.Menus
{
    public class Menu
    {
        public static List<MenuItem> MenuItems
        {
            get
            {
                var list = new List<MenuItem>();
                list.Add(new MenuItem { IsTitle = true, Label = "Main" });

                list.Add(new MenuItem { Label = "Dashboard", Icon = "home", Link = "/" });
                list.Add(new MenuItem { IsTitle = true, Label = "Operations" });
                //taks
                var taskMenu = new MenuItem
                {
                    Id = 5,
                    Label = "Task Management",
                    Icon = "briefcase",
                    Permissions = new List<string> { Permissions.Menu.AppTask }
                };
                taskMenu.SubItems = new List<MenuItem>
                {
                    new MenuItem
                    {
                        Label = "New Task",
                        Link = "/ops-task/task/create",
                        ParentId = 5,
                        Permissions = new List<string> { Permissions.AppTaskPermision.Add }
                    }
                };
                list.Add(taskMenu);

                var assessmentMenu = new MenuItem
                {
                    Id = 5,
                    Label = "Assessment",
                    Icon = "briefcase",
                    Permissions = new List<string> { Permissions.Menu.AppTask }
                };
                assessmentMenu.SubItems = new List<MenuItem>
                {
                     new MenuItem
                    {
                        Label = "List",
                        Link = "/ops-asmt/assessment",
                        ParentId = 5,
                        Permissions = new List<string> { Permissions.AssessmentPermision.View }
                    },
                      new MenuItem
                    {
                        Label = "Pending Review",
                        Link = "/ops-asmt/assessment/pending-review",
                        ParentId = 5,
                        Permissions = new List<string> { Permissions.AssessmentPermision.Review }
                    },
                };
                list.Add(assessmentMenu);


                //feeNote
                var feeNoteMenu = new MenuItem
                {
                    Id = 5,
                    Label = "Invoicing",
                    Icon = "briefcase",
                    Permissions = new List<string> { Permissions.Menu.Invoice }
                };
                feeNoteMenu.SubItems = new List<MenuItem>
                {
                     new MenuItem
                    {
                        Label = "Fee Notes",
                        Link = "/ops-invoice/feenote",
                        ParentId = 5,
                        Permissions = new List<string> { Permissions.Invoicing.View }
                    },


                };
                list.Add(feeNoteMenu);



                var reportMenu = new MenuItem
                {
                    Id = 96,
                    Label = "Reports",
                    Icon = "clipboard",
                    Link = "/report/dashboard",
                    Permissions = new List<string> { Permissions.Menu.Report, Permissions.Report.Dashboard }
                };
                //reportMenu.SubItems = new List<MenuItem>
                //{
                //    new MenuItem
                //    {
                //        Label = "Dashboard",
                //        Link = "/report/dashboard",
                //        ParentId = 96,
                //        Permissions = new List<string> { Permissions.Report.Dashboard }
                //    }
                //};
                list.Add(reportMenu);

                list.Add(new MenuItem { IsTitle = true, Label = "Admin", Permissions = new List<string> { Permissions.Menu.Setting, Permissions.Menu.UserManagement, Permissions.Menu.MasterData , Permissions.Menu.VehicleMasterData } });
                var vehicleDataMenu = new MenuItem
                {
                    Id = 5,
                    Label = "Vehicle Data",
                    Icon = "globe",
                    Permissions = new List<string> { Permissions.Menu.VehicleMasterData }
                };
                vehicleDataMenu.SubItems = new List<MenuItem>
                {
                     new MenuItem
                    {
                        Label = "Add Vehicle Part",
                        Link = "/masterdata/add-part",
                        ParentId = 99,
                        Permissions = new List<string> { Permissions.VehicleMasterData.AddPart }
                    },

                };
                list.Add(vehicleDataMenu);
                //master data
                var mdMenu = new MenuItem
                {
                    Id = 99,
                    Label = "Master Data",
                    Icon = "globe",
                    Permissions = new List<string> { Permissions.Menu.MasterData }
                };
                mdMenu.SubItems = new List<MenuItem>
                {
                    new MenuItem
                    {
                        Label = "Clients",
                        Link = "/masterdata/department",
                        ParentId = 99,
                        Permissions = new List<string> { Permissions.AccountMasterData.View }
                    },
               
                   


                };
                list.Add(mdMenu);

                //user management
                var umMenu = new MenuItem
                {
                    Label = "User Manangement",
                    Icon = "users",
                    Id = 98,
                    Permissions = new List<string> { Permissions.Menu.UserManagement }
                };
                umMenu.SubItems = new List<MenuItem>
                {
                    new MenuItem
                    {
                        Label = "Users",
                        Link = "/um/user",
                        ParentId = 98,
                        Permissions = new List<string> { Permissions.Users.View }
                    },
                    new MenuItem
                    {
                        Label = "Roles",
                        Link = "/um/role",
                        ParentId = 98,
                        Permissions = new List<string> { Permissions.Users.Roles }
                    }
                };
                list.Add(umMenu);

                //settings
                var seMenu = new MenuItem
                {
                    Label = "Setting",
                    Icon = "settings",
                    Id = 97,
                    Permissions = new List<string> { Permissions.Menu.Setting }
                };
                seMenu.SubItems = new List<MenuItem>
                {
                    new MenuItem
                    {
                        Label = "Report Groups",
                        Link = "/settings/reportgroup",
                        ParentId = 97,
                        Permissions = new List<string> { Permissions.Setting.Update }
                    },
              


                };
                list.Add(seMenu);

                return list;
            }
        }
    }
}
