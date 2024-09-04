
import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { PartCategory } from '../../../core/models/vehicle.models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { PartCategoryService } from '../../../core/services/part-category.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-part-category-list',
  templateUrl: './part-category-list.component.html',
  styles: []
})
export class PartCategoryListComponent extends BasePagedListComponent implements OnInit {
  items: PartCategory[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private partCategoryService: PartCategoryService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Part Category" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.partCategoryService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this part category?")
    .then((result) => {
      if(result.isConfirmed){
        this.partCategoryService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
