import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { VehicleModelPartService } from '../../../core/services/vehicle-model-part.service';
import { VehicleModelPart, VehicleModelPartUpdate } from '../../../core/models/vehicle.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModelSelectorModalComponent } from '../../../core/components/vehicle-model-selector-modal/vehicle-model-selector-modal.component';
import { LookupItem } from '../../../shared/models/responses/lookup-item';
import { MessageBoxService } from '../../../shared/services/message-box.service';


@Component({
  selector: 'app-vehicle-model-part-list',
  templateUrl: './vehicle-model-part-list.component.html',
})
export class VehicleModelPartListComponent extends BasePagedListComponent implements OnInit {
  model: LookupItem = { name: '', code: '', id: '' };
  items: VehicleModelPart[] = [];
  constructor(
    protected router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private vehicleModelPartService: VehicleModelPartService,
    private modalService: NgbModal,
    private messageBoxService:MessageBoxService
  ) { super() }
  ngOnInit(): void {
    this.pageTitle = "List"
    this.route.params.pipe().subscribe((params) => {
      this.prepareTitle()
    })
    this.route.queryParams.pipe(first()).subscribe({ next: (_) => this.fetchPagingParams(_) });
    this.loadItems()
  }
  prepareTitle() {
    this.breadCrumbItems = []
    this.pageTitle = this.pageTitle;
    this.addbcItem("Master Data")
    this.addbcItem("Vehicle Model Part")
    this.addbcItem(this.pageTitle, true)
  }
  override loadItems() {
    if (this.model) {
      this.vehicleModelPartService.list(this.model.id, this.page, this.pageSize, this.search)
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
  }

  selectVehicleModel() {
    var modalRef = this.modalService.open(VehicleModelSelectorModalComponent, { backdrop: 'static', size: 'lg', });
    modalRef.componentInstance.title = "Vehicle Model Selector"
    modalRef.closed.subscribe({
      next: (_) => {
        this.model = { id: _.id, name: _.name, code: _.code }
        this.loadItems()
      }
    })

  }
  back() { }
  updateFromDatabase() {
    this.errors=[]
    var model: VehicleModelPartUpdate = { modelId: this.model.id }
    this.vehicleModelPartService.updateModelPartFromDatabase(model).pipe(first()).subscribe({
      next: (_) => {
        console.log("updated");
        this.messageBoxService.toastSuccess("Vehicle model parts updated successfully")
        this.page=1
        this.loadItems()
      },
      error: (_) => {
        this.errors = _;
        console.log('Error =>', this.errors);
      },
    })

  }
}
