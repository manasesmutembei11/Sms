import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';

const routes: Routes = [
  {
    path: 'department',
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: DepartmentListComponent, pathMatch: 'full', },
      { path: 'create', component: DepartmentFormComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: DepartmentFormComponent },
    ]
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterdataRoutingModule { }
