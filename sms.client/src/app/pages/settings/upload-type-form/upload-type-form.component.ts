import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';

import { Location } from '@angular/common';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { UploadMimeType, UploadType } from '../../../shared/models/uploads/upload-type';
import { UploadTypeService } from '../../../shared/services/upload-type.service';

@Component({
  selector: 'app-upload-type-form',
  templateUrl: './upload-type-form.component.html',
  styleUrls: ['./upload-type-form.component.scss'],
})
export class UploadTypeFormComponent extends BaseFormComponent
implements OnInit {
form: FormGroup = this.createForm();


constructor(
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private router: Router,
  public location: Location,
  private service: UploadTypeService
) {
  super();
}

ngOnInit(): void {
  this.form = this.createForm();
  this.route.params.pipe().subscribe((params) => {

    this.id = params['id'] ? params['id'] : '';
    this.editMode = params['id'] != null;
    this.pageTitle = this.editMode ? 'Edit Upload Type' : 'New Upload Type';
    this.breadCrumbItems = [
      { label: 'Setting' },
      { label: 'Upload Type' },
      { label: this.pageTitle, active: true },
    ];
    this.buttonText = this.editMode ? 'Update' : 'Create';
    this.initForm();
  });

}

createForm(): FormGroup {
  const f = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', Validators.required],
    description: ['', Validators.required],
    id: [Guid.create().toString()],
    extensions: this.fb.array([])
  });
  return f;
}
get f() { return this.form.controls; }
get extensionFormArray(): FormArray {
  return this.f['extensions'] as FormArray;
}
createExtensionForm(item: UploadMimeType) {
  const f = this.fb.group({
    id: [0],
    type: [''],
    name: [''],
    checked: [false],
  });
  f.patchValue(item);
  const fa = this.extensionFormArray;
  fa.push(f);
}

initForm() {
  if (this.editMode) {
    this.service
      .findById(this.id)
      .pipe(first())
      .subscribe((data) => {

        this.form.patchValue(data);
      
        data.extensions?.forEach(f => {
          console.log("extensions => data", f);
          this.createExtensionForm(f)
        })

      });
  } else {
    this.service.mimeTypes().pipe(first()).subscribe({
      next: (_) => {
        _.forEach(f => this.createExtensionForm(f))
      }
    })
  }
}
onSubmit() {
  this.submitted = true;
  if (this.validateForm(this.form)) {
    const model = Object.assign(this.form.value) as UploadType;
    console.log('model', model);

    this.service
      .save(model)
      .subscribe({
        next: (_) => {
          this.location.back()
        },
        error: (errors) => {
          this.errors = errors;
          console.log('Error =>', this.errors);
        }
      });

  }
}
back(): void {
  this.location.back()
}
}
