import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base-component';
import { ReportGroup } from '../../../shared/models/reports/report-group';
import { ReportGroupService } from '../../../shared/services/report-group.service';


@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styles: [
  ]
})
export class ReportDashboardComponent extends BaseComponent implements OnInit {
  menus: ReportGroup[]=[];

  constructor( private service:ReportGroupService) {  super()}

  ngOnInit(): void {
    this.pageTitle="Dashboard"
    this.breadCrumbItems=[
      {label:"Reports"},
      {label:this.pageTitle,active:true}
    ]
    this.service.reports().pipe(first()).subscribe(data=> this.menus=data)
  }

}
