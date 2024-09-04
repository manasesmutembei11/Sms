import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from '../shared/components/forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'um', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'Forbidden', component: ForbiddenComponent },   
  { path: 'report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  { path: 'masterdata', loadChildren: () => import('./masterdata/masterdata.module').then(m => m.MasterdataModule) },  
  { path: 'ops-task', loadChildren: () => import('./app-task/app-task.module').then(m => m.AppTaskModule) },
  { path: 'ops-asmt', loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule) },
  { path: 'ops-insp', loadChildren: () => import('./reinspection/reinspection.module').then(m => m.ReinspectionModule) },
  { path: 'ops-invoice', loadChildren: () => import('./invoicing/invoicing.module').then(m => m.InvoicingModule) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
