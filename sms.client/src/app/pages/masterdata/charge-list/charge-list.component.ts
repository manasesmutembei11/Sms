import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Charge } from '../../../core/models/master-data.models';
import { ChargeService } from '../../../core/services/charge.service';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styles: [
  ]
})
export class ChargeListComponent extends BasePagedListComponent implements OnInit {
  items: Charge[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private chargeService: ChargeService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Charge" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.chargeService.list(this.page, this.pageSize, this.search)
      .pipe(first())
      .subscribe({
        next: (_) => {
          this.items = _.data;
          this.totalCount = _.metaData.totalCount;
        }
      });
    const params = {
      page: this.page,
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge' });
  }
  deleteItem(id: string) {
    this.messageBox.confirm("Are you sure you want to delete this charge item?")
    .then((result) => {
      if(result.isConfirmed){
        this.chargeService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
