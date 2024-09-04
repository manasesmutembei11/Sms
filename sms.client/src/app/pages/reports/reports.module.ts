import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';

import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ReportDashboardComponent,
    ReportViewerComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
