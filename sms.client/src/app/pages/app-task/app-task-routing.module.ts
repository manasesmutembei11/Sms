import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AppTaskListComponent } from './app-task-list/app-task-list.component';
import { AppTaskFormComponent } from './app-task-form/app-task-form.component';
import { AppTaskListAllComponent } from './app-task-list-all/app-task-list-all.component';
import { AssessmentTaskDetailComponent } from './assessment-task-detail/assessment-task-detail.component';
const routes: Routes = [ 
  {
    path: 'task',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AppTaskListComponent, pathMatch: 'full',},
      { path: 'all', component: AppTaskListAllComponent, pathMatch: 'full',},
      { path: 'create', component: AppTaskFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: AppTaskFormComponent},
      { path: 'asmt-detail/:id', component: AssessmentTaskDetailComponent},
     
    ]
  },   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTaskRoutingModule { }
