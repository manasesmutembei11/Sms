import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VehicleMake } from '../../../core/models/vehicle.models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { VehicleMakeService } from '../../../core/services/vehicle-make.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-vehicle-make-list', 
  templateUrl: './vehicle-make-list.component.html',
})
export class VehicleMakeListComponent  extends BasePagedListComponent implements OnInit {
  items: VehicleMake[] = [];
  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private vehicleMakeService: VehicleMakeService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Vehicle Make" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
  loadItems() {
    this.vehicleMakeService.list(this.page, this.pageSize, this.search)
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
    this.messageBox.confirm("Are you sure you want to delete this vehicle make?")
    .then((result) => {
      if(result.isConfirmed){
        this.vehicleMakeService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}

