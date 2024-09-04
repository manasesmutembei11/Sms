import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { LookupItem } from '../../../shared/models/responses/lookup-item';
import { OperationType } from '../../../shared/models/uploads/operation-type';
import { UploadConfigService } from '../../../shared/services/upload-config.service';
import { UploadTypeService } from '../../../shared/services/upload-type.service';

@Component({
  selector: 'app-upload-config-list',
  templateUrl: './upload-config-list.component.html',
  styleUrls: ['./upload-config-list.component.scss']
})
export class UploadConfigListComponent extends BasePagedListComponent implements OnInit {
  items: OperationType[]=[];
  uploadTypes: LookupItem[]=[];


  constructor(
    private uploadConfigService:UploadConfigService,
    private uploadTypeService:UploadTypeService
    ) { super()}

  ngOnInit(): void {
    this.pageTitle = 'List';
    this.breadCrumbItems = [
      { label: 'Setting' },
      { label: 'Upload Configuration' },
      { label: this.pageTitle, active: true },
    ];
    this.loadItems()
    this.loadUploadTypes()
  }

  loadItems() {
    this.uploadConfigService.getOperationTypes()
    .pipe(first())
    .subscribe(data => {
      this.items = data;
    });
  }

  loadUploadTypes(){
    this.uploadTypeService.lookupList()
    .pipe(first())
    .subscribe(data => {
      this.uploadTypes = data;
    });
  }

}
