
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';

import { Location } from '@angular/common';
import { VehicleCategory } from '../../../core/models/vehicle.models';
import { VehicleCategoryService } from '../../../core/services/vehicle-category.service';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { CustomValidators } from '../../../shared/custom-validators/custom-validators';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';

@Component({
  selector: 'app-vehicle-category-form',
  templateUrl: './vehicle-category-form.component.html',
  styles:[]
})
export class VehicleCategoryFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  bodyTypes: EnumLookupItem[]=[];
 
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location, 
    private vehicleCategoryService: VehicleCategoryService,
    private enumLookupService: EnumLookupService
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Vehicle Category' : 'New Vehicle Category';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Vehicle Category' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });

    this.enumLookupService.vehicleBodyTypeList().pipe(first()).subscribe({
      next:(_)=>{
        this.bodyTypes=_
      }
    })
   
    

  }
  
  


  createForm(): FormGroup {
    const f = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', Validators.required],      
      bodyType: [null,[Validators.required]],   
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.vehicleCategoryService
        .findById(this.id)
        .pipe(first())
        .subscribe((data) => {         
          this.form.patchValue(data);         
        });
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: VehicleCategory = cloneDeep(this.form.value)
    
      this.vehicleCategoryService.save(model).subscribe({
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
