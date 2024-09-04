import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { VehicleColor } from '../../../core/models/vehicle.models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { VehicleColorService } from '../../../core/services/vehicle-color.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-vehicle-color-list',
  templateUrl: './vehicle-color-list.component.html',
  styles: []
})
export class VehicleColorListComponent extends BasePagedListComponent implements OnInit {
  items: VehicleColor[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private vehicleColorService: VehicleColorService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Vehicle Color" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.vehicleColorService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this vehicle color?")
    .then((result) => {
      if(result.isConfirmed){
        this.vehicleColorService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
