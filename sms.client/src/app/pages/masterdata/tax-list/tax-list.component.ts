import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Tax } from '../../../core/models/master-data.models';
import { TaxService } from '../../../core/services/tax.service';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styles: [
  ]
})
export class TaxListComponent extends BasePagedListComponent implements OnInit {
  items: Tax[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private taxService: TaxService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Tax" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.taxService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this tax?")
    .then((result) => {
      if(result.isConfirmed){
        this.taxService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
