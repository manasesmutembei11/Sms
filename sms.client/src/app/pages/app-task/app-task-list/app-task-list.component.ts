
import { Component, OnInit } from '@angular/core';
import { AppTask } from '../../../core/models/app-task.models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { AppTaskService } from '../../../core/services/app-task.service';

@Component({
  selector: 'app-app-task-list',  
  templateUrl: './app-task-list.component.html',
})
export class AppTaskListComponent extends BasePagedListComponent implements OnInit {
  items: AppTask[] = [];
  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private appTaskService: AppTaskService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "My List"
    this.breadCrumbItems = [
      { label: "Operations" },  
      { label: "Task" },    
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
 
 

  loadItems() {
    
    
    this.appTaskService.list(this.page, this.pageSize, this.search)
      .pipe(first())
      .subscribe({
        next: (_) => {
          this.items = _.data;
          this.totalCount = _.metaData.totalCount;
        }
      });
    const params:Params = {
      page: this.page,
    }
    this.router.navigate(["."], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge' });

  }


}

