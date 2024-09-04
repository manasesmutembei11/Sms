import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { ReportGroup } from '../../../shared/models/reports/report-group';
import { ReportGroupService } from '../../../shared/services/report-group.service';


@Component({
  selector: 'app-report-group',
  templateUrl: './report-group.component.html',
  styleUrls: ['./report-group.component.scss']
})
export class ReportGroupComponent extends BasePagedListComponent implements OnInit {
  items: ReportGroup[]=[];


  constructor(
    private reportGroupService: ReportGroupService
  ) {  super()}

  ngOnInit(): void {
    this.pageTitle="List"
    this.breadCrumbItems=[
      {label:"Setting"},
      {label:"Report Group"},
      {label:this.pageTitle,active:true}
    ]
    this.loadItems()
  }

  loadItems() {
    this.reportGroupService.list(this.page, this.pageSize, this.search)
    .pipe(first())
    .subscribe(s => {
      this.items = s.data;
      this.totalCount = s.metaData.totalCount;
    });
  }

}
