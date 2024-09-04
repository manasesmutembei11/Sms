import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { StorageConfig } from '../../../shared/models/config-models';


@Component({
  selector: 'app-config-storage',
  templateUrl: './config-storage.component.html',
  styleUrls: ['./config-storage.component.scss']
})
export class ConfigStorageComponent extends BaseFormComponent implements OnInit {

  form:FormGroup= this.fb.group({});
  @Input() configType :EnumLookupItem= {}  as EnumLookupItem
  constructor(
    public location: Location,
    private fb: FormBuilder,
    private configurationService:ConfigurationService
    ) { super()}

  ngOnInit(): void {
    this.form=this.createForm();
    this.initForm();
  }

  createForm(): FormGroup {
    const f = this.fb.group({
      uploadPath: ['', [Validators.required]],
      otherPath: ['', Validators.required],
      documentPath: ['', Validators.required],
      configType: [this.configType.id],
      id: [Guid.create().toString()],
    });
    return f;

  }
  initForm() {

    this.configurationService.getConfig(this.configType?.id).pipe(first()).subscribe(data => {
      this.form.patchValue(data);
    });

  }
  onSubmit(){
    this.submitted=true;
    if (this.validateForm(this.form)) {
      const model = Object.assign(this.form.value) as StorageConfig;
      this.configurationService.save(model)
        .subscribe({
          next: (_) => {
            console.log(" StorageConfig Result => ",_);
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
