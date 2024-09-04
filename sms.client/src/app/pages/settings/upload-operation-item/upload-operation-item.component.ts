import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';

import { UploadOperationItemModalComponent } from '../upload-operation-item-modal/upload-operation-item-modal.component';
import { LookupItem } from '../../../shared/models/responses/lookup-item';
import { OperationType } from '../../../shared/models/uploads/operation-type';
import { UploadConfig } from '../../../shared/models/uploads/upload-config';
import { UploadConfigService } from '../../../shared/services/upload-config.service';

@Component({
  selector: 'app-upload-operation-item',
  templateUrl: './upload-operation-item.component.html',
  styleUrls: ['./upload-operation-item.component.scss'],
})
export class UploadOperationItemComponent implements OnInit {
  @Input() operation: OperationType | undefined;
  @Input() uploadTypes: LookupItem[] = [];
  items: UploadConfig[] = [];

  constructor(
    private modalService: NgbModal,
    private uploadConfigService: UploadConfigService
  ) {}

  ngOnInit(): void {
    this.loadOperationUploadTypes();
  }

  add() {

    const modalRef = this.modalService.open(UploadOperationItemModalComponent, {
      backdrop: 'static',
      size: 'xl',
    });
    modalRef.componentInstance.operation = this.operation;
    var ids = this.items.map((s) => s.uploadTypeId.toLowerCase());
    modalRef.componentInstance.uploadTypes = this.uploadTypes.filter(
      (f) => !ids.includes(f.id.toLowerCase())
    );
    modalRef.closed.subscribe((data) => {
      if (data) {
        this.loadOperationUploadTypes();
      }
    });
    modalRef.dismissed.subscribe((data) => console.log('Modal =>', data));
  }
  loadOperationUploadTypes() {
    this.uploadConfigService
      .getOperationUploadTypes(this.operation?.id)
      .pipe(first())
      .subscribe((data) => {
        console.log('Operation Upload Types => ', data);

        this.items = data;
      });
  }
  remove(item: UploadConfig) {
    this.uploadConfigService.delete(item).subscribe({
      next: (_) => {
        this.loadOperationUploadTypes();
      },
      error: (errors) => {
        //this.errors = errors;
        //console.log('Error =>', this.errors);
      },
    });
  }
}
