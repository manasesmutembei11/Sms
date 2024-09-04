import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { LookupItem } from '../../../shared/models/responses/lookup-item';
import { OperationType } from '../../../shared/models/uploads/operation-type';
import { UploadConfig } from '../../../shared/models/uploads/upload-config';
import { UploadConfigService } from '../../../shared/services/upload-config.service';


@Component({
  selector: 'app-upload-operation-item-modal',
  templateUrl: './upload-operation-item-modal.component.html',
  styleUrls: ['./upload-operation-item-modal.component.scss']
})
export class UploadOperationItemModalComponent extends BaseFormComponent implements OnInit {
  form: FormGroup= this.fb.group({})
  @Input() operation: OperationType | undefined;
  @Input() uploadTypes: LookupItem[]=[] ;
  constructor(
    public activeModal: NgbActiveModal,
     public location: Location,
     private fb: FormBuilder,
     private uploadConfigService:UploadConfigService
     ) { super()}

  ngOnInit(): void {
    this.form=this.createForm()
  }

  createForm(): FormGroup {
    console.log('operation', this.operation);
    const f = this.fb.group({
      uploadOperation:[this.operation?.id],
      uploadTypeId: ['', Validators.required],
      isRequired: [false],
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {

  }
  ok(){
    this.submitted=true
    if (this.validateForm(this.form)) {
      const model = Object.assign(this.form.value) as UploadConfig;
      console.log('model', model);


      this.uploadConfigService
        .save(model)
        .subscribe({
          next: (_) => {
            this.activeModal.close(true)
          },
          error: (errors) => {
            this.errors = errors;
            console.log('Error =>', this.errors);
          }
        });

    }
  }
  back() {
    this.location.back()
  }
}
