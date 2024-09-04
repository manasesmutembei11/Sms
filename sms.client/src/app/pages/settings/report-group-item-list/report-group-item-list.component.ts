import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { ReportGroup } from '../../../shared/models/reports/report-group';
import { ReportGroupItem } from '../../../shared/models/reports/report-group-item';
import { ReportGroupItemService } from '../../../shared/services/report-group-item.service';
import { ReportGroupService } from '../../../shared/services/report-group.service';


@Component({
  selector: 'app-report-group-item-list',
  templateUrl: './report-group-item-list.component.html',
  styleUrls: ['./report-group-item-list.component.scss']
})
export class ReportGroupItemListComponent extends BasePagedListComponent implements OnInit {
  items: ReportGroupItem[]=[];
  groupId: any;
  group:ReportGroup={
    id: '',
    no: 0,
    name: ''
  };
  override pageTitle=`${this.group.name} - Reports`

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private service: ReportGroupItemService,
    private groupService:ReportGroupService
  ) { super()}

  ngOnInit(): void {

    this.route.params.pipe().subscribe(params => {
      this.groupId = params['groupId'] ? params['groupId'] : '';
      if(!this.groupId){
        this.router.navigate(['/settings/reportgroup/']);
      }else{

        this.loadGroup()
        this.loadItems()
      }
    });

  }
  loadGroup(){
    this.groupService.findById(this.groupId)
    .pipe(first())
    .subscribe(group => {
      this.group = group;
      this.pageTitle=`Reports`

      this.breadCrumbItems=[
        {label:"Setting"},
        {label:"Report Group"},
        {label:this.group.name},
        {label:this.pageTitle,active:true}
      ]

    });
  }

  loadItems() {
    this.service.list(this.groupId,this.page, this.pageSize, this.search)
    .pipe(first())
    .subscribe(s => {
      this.items = s.data;
      this.totalCount = s.metaData.totalCount;
    });
  }

}
