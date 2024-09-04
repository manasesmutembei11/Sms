import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { PartCondition } from '../../../core/models/vehicle.models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { PartConditionService } from '../../../core/services/part-condition.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-part-condition-list',
  templateUrl: './part-condition-list.component.html',
  styles: [] 
})
export class PartConditionListComponent extends BasePagedListComponent implements OnInit {
  items: PartCondition[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private partConditionService: PartConditionService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Part Condition" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.partConditionService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this part condition?")
    .then((result) => {
      if(result.isConfirmed){
        this.partConditionService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
