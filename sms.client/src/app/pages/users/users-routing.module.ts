import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoleFormComponent } from './user-role-form/user-role-form.component';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';
import { UserRolePermissionsComponent } from './user-role-permissions/user-role-permissions.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../../shared/guards/auth.guard';


const routes: Routes = [
  { path: 'profile/:id', component: UserProfileComponent, },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserListComponent, pathMatch: 'full', },
      { path: 'create', component: UserFormComponent, pathMatch: 'full', },
      { path: 'edit/:id', component: UserFormComponent, },
      
    ]
  },
  {
    path: 'role',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserRoleListComponent },
      { path: 'create', component: UserRoleFormComponent },
      { path: 'edit/:id', component: UserRoleFormComponent },
      { path: 'permissions/:id', component: UserRolePermissionsComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
