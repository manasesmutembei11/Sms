import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '../../../core/models/vehicle.models';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleMakeService } from '../../../core/services/vehicle-make.service';
import { VehicleModelService } from '../../../core/services/vehicle-model.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-vehicle-model-list',  
  templateUrl: './vehicle-model-list.component.html',
})
export class VehicleModelListComponent  extends BasePagedListComponent implements OnInit {
  items: VehicleModel[] = [];
  makeId: any;

  constructor(
    protected router: Router,
    private location:Location,
    private route: ActivatedRoute,
    private vehicleMakeService: VehicleMakeService,
    private vehicleModelService: VehicleModelService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.route.params.pipe().subscribe((params) => {
      this.makeId = params['makeId'] ? params['makeId'] : '';     
      this.prepareTitle()
    })    
    this.route.queryParams.pipe(first()).subscribe({ next: (_) => this.fetchPagingParams(_) });
    this.loadItems()
  }
  prepareTitle(){
    this.breadCrumbItems=[]
    this.pageTitle = this.pageTitle;
    this.addbcItem("Master Data")
    this.addbcItem("Vehicle Make")    
    if (this.makeId) {
      this.vehicleMakeService
        .findById(this.makeId)
        .pipe(first())
        .subscribe({
          next:(_)=>{
            this.addbcItem(_.name)
            this.addbcItem("Model")
            this.addbcItem(this.pageTitle,true)
          }
        });
    }
  }
  loadItems() {
    this.vehicleModelService.list(this.makeId,this.page, this.pageSize, this.search)
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
    this.router.navigate(["."], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge' });
  }
  back() {
    this.location.back()
    this.location.back()
  }

}

