import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { ClientAccount } from '../../../core/models/client-account.models';
import { ClientAccountService } from '../../../core/services/client-account.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-client-account-list',
  templateUrl: './client-account-list.component.html',
  styles: []
})
export class ClientAccountListComponent extends BasePagedListComponent implements OnInit {

  items: ClientAccount[] = [];
  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private clientAccountService: ClientAccountService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Client Account" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
 
 

  loadItems() {
    
    
    this.clientAccountService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete client account?")
    .then((result) => {
      if(result.isConfirmed){
        this.clientAccountService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }




}
