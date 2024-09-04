import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehicleColorService } from '../../../core/services/vehicle-color.service';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { VehicleColor } from '../../../core/models/vehicle.models';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-vehicle-color-form',
  templateUrl: './vehicle-color-form.component.html',
  styles: []
})
export class VehicleColorFormComponent extends BaseFormComponent implements OnInit{

  form: FormGroup = this.fb.group({});
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private vehicleColorService: VehicleColorService
  ) {
    super();
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Vehicle Color' : 'New Vehicle Color';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Vehicle Color' },
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
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.vehicleColorService.findById(this.id).pipe(first())
        .subscribe({
          next: (_) => {
            this.form.patchValue(_);
          }
        })

    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: VehicleColor = cloneDeep(this.form.value)
      console.log("onSubmit =>",model);
      

      this.vehicleColorService.save(model).subscribe({
        next: (_) => {
          this.location.back();
        },
        error: (errors) => {
          this.errors = errors;
          console.log('Error =>', this.errors);
        },
      });
    }
  }
  back(): void {
    this.location.back();
  }

}
