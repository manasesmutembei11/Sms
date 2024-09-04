import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Location } from '@angular/common';
import { BaseComponent } from '../../../shared/components/base-component';
import { RolePermissions } from '../../../shared/models/users/role-permissions';
import { UserRoleService } from '../../../shared/services/user-role.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-user-role-permissions',
  templateUrl: './user-role-permissions.component.html',
  styleUrls: ['./user-role-permissions.component.scss']
})
export class UserRolePermissionsComponent extends BaseComponent implements OnInit {


 active = 1;
 id:  any= null
 rolePermissions:RolePermissions|any
  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private roleService:UserRoleService,
    private router:Router,
    private location:Location,
    private messageBoxService:MessageBoxService
  ) {
    super()

   }

  ngOnInit(): void {
    this.pageTitle=`Permissions: `
    this.breadCrumbItems=[
      {label:"User Management"},
      {label:"Role"},
      {label:this.pageTitle,active:true}
    ]
    this.route.params.pipe().subscribe(params => {
      this.id = params['id'] ? params['id'] : '';
      this.populate();
    });
  }

  populate() {
    this.roleService.getPermissions(this.id).pipe(first()).subscribe(data => {
      this.rolePermissions=data;
      this.pageTitle=`Role permissions: ${this.rolePermissions.roleName}`
      console.log("Changed Role Permisions =>",this.rolePermissions);
    });
  }
  saveChanges(){


    this.roleService
        .savePermission(this.rolePermissions)
        .pipe(first())
        .subscribe({
          next:()=>{
            this.messageBoxService.toastSuccess("Permission changes saved successfuly")
          },
          error:(errors) =>{
            this.errors = errors;
            console.log('Error =>', this.errors);
            this.messageBoxService.toastWarning("Failed to save changes")
          }
        })

  }
  back(){
  this.location.back()
  }

}
