import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { AuthGuard } from '../../shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReportDashboardComponent, pathMatch: 'full', title:"Report Dashboard",},
      { path: 'reportviewer/:id', component: ReportViewerComponent,pathMatch: 'full', title:"Report Viewer", },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
