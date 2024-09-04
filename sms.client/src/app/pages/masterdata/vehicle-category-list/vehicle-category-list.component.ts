import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehicleCategoryService } from '../../../core/services/vehicle-category.service';
import { VehicleCategory } from '../../../core/models/vehicle.models';
import { first } from 'rxjs';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-vehicle-category-list',
  templateUrl: './vehicle-category-list.component.html',
  styles: []
})
export class VehicleCategoryListComponent extends BasePagedListComponent implements OnInit {
  items: VehicleCategory[] = [];
  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private VehicleCategoryService: VehicleCategoryService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Vehicle Category" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.VehicleCategoryService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this vehicle category?")
    .then((result) => {
      if(result.isConfirmed){
        this.VehicleCategoryService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
