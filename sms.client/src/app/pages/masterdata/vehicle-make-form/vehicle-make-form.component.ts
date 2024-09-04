import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehicleMakeService } from '../../../core/services/vehicle-make.service';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { VehicleMake } from '../../../core/models/vehicle.models';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-vehicle-make-form',
  templateUrl: './vehicle-make-form.component.html',
})
export class VehicleMakeFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private vehicleMakeService: VehicleMakeService
  ) {
    super();
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Vehicle Make' : 'New Vehicle Make';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Vehicle Make' },
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
      this.vehicleMakeService.findById(this.id).pipe(first())
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
      const model: VehicleMake = cloneDeep(this.form.value)
      console.log("onSubmit =>",model);
      

      this.vehicleMakeService.save(model).subscribe({
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

