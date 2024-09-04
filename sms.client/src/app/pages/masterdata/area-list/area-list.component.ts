import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { Area } from '../../../core/models/area.model';
import { AreaService } from '../../../core/services/area.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styles: [
  ]
})
export class AreaListComponent extends BasePagedListComponent implements OnInit {
  items: Area[] = [];
  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private areaService: AreaService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Area" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.areaService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this area?")
    .then((result) => {
      if(result.isConfirmed){
        this.areaService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
