import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';

import { AssessorAccountService } from '../../../core/services/assessor-account.service';
import { AssessorAccount } from '../../../core/models/assessor-account.models';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-assessor-account-list',
  templateUrl: './assessor-account-list.component.html',
  styles: []
})
export class AssessorAccountListComponent extends BasePagedListComponent implements OnInit{

  
  items: AssessorAccount[] = [];
  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private assessorAccountService: AssessorAccountService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Assessor Account" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
 
 

  loadItems() {
    
    
    this.assessorAccountService.list(this.page, this.pageSize, this.search)
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
  deleteItem(id: string) {
    this.messageBox.confirm("Are you sure you want to delete this assessor?")
    .then((result) => {
      if(result.isConfirmed){
        this.assessorAccountService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }


}
