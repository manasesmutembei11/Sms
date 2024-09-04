import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { Part } from '../../../core/models/vehicle.models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { PartService } from '../../../core/services/part.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styles: []
})
export class PartListComponent extends BasePagedListComponent implements OnInit {
  items: Part[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private partService: PartService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Part" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.partService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this part?")
    .then((result) => {
      if(result.isConfirmed){
        this.partService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
