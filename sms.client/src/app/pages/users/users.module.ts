import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';


import { UserRoleListComponent } from './user-role-list/user-role-list.component';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoleFormComponent } from './user-role-form/user-role-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { UserRolePermissionsComponent } from './user-role-permissions/user-role-permissions.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AccountPickerModalComponent } from './account-picker-modal/account-picker-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [UserListComponent, UserFormComponent, UserRoleListComponent, UserRoleFormComponent, UserRolePermissionsComponent, AccountPickerModalComponent, UserProfileComponent],
  imports: [
    CommonModule,
   NgbDropdownModule,
   NgbPaginationModule,
   NgbTooltipModule,
   NgbNavModule,
   UsersRoutingModule,
   FormsModule,
   ReactiveFormsModule,
   NgxErrorsModule,
   SharedModule,
   NgbModalModule,
   SweetAlert2Module.forRoot(),
  ],
})
export class UsersModule {}
