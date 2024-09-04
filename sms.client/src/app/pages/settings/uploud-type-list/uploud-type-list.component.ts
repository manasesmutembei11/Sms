import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { UploadType } from '../../../shared/models/uploads/upload-type';
import { UploadTypeService } from '../../../shared/services/upload-type.service';


@Component({
  selector: 'app-uploud-type-list',
  templateUrl: './uploud-type-list.component.html',
  styleUrls: ['./uploud-type-list.component.scss'],
})
export class UploudTypeListComponent  extends BasePagedListComponent  implements OnInit
{
  items: UploadType[]=[];

  constructor(
    private uploadTypeService:UploadTypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.pageTitle = 'List';
    this.breadCrumbItems = [
      { label: 'Setting' },
      { label: 'Upload Type' },
      { label: this.pageTitle, active: true },
    ];
    this.loadItems();
  }
  loadItems() {
    this.uploadTypeService.list(this.page, this.pageSize, this.search)
    .pipe(first())
    .subscribe(s => {
      this.items = s.data;
      this.totalCount = s.metaData.totalCount;
    });
  }
}
