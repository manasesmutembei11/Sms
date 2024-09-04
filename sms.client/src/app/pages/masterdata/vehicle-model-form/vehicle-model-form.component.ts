import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehicleMakeService } from '../../../core/services/vehicle-make.service';
import { VehicleModelService } from '../../../core/services/vehicle-model.service';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { VehicleModel } from '../../../core/models/vehicle.models';
import { cloneDeep } from 'lodash';
import { VehicleCategoryService } from '../../../core/services/vehicle-category.service';
import { EnumLookupItem, LookupItem } from '../../../shared/models/responses/lookup-item';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';

@Component({
  selector: 'app-vehicle-model-form',  
  templateUrl: './vehicle-model-form.component.html',
})
export class VehicleModelFormComponent   extends BaseFormComponent  implements OnInit {
  form: FormGroup = this.fb.group({}); 
  makeId: any;
  categories: LookupItem[]=[];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location, 
    private vehicleMakeService: VehicleMakeService,
    private vehicleModelService: VehicleModelService,
    private vehicleCategoryService: VehicleCategoryService,
    private enumLookupService:EnumLookupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.makeId = params['makeId'] ? params['makeId'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Model' : 'New Model';
     
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.form = this.createForm();
      this.initForm();
      console.log("makeId id =>",this.makeId);
    });
    this.prepareTitle()
    this.vehicleCategoryService.lookupList().pipe(first()).subscribe({
      next:(_)=>{
        this.categories=_
      }
    })
  }
  prepareTitle(){
    this.breadCrumbItems=[]
    this.pageTitle = this.pageTitle;
    this.addbcItem("Master Data")
    this.addbcItem("Vehicle Make")
    
  }
  createForm(): FormGroup {
    const f = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', Validators.required],  
      makeId: [this.makeId, Validators.required],  
      capacity: ['', Validators.required],
      fuelType: ['', Validators.required],
      categoryId: [null, Validators.required],     
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.vehicleModelService.findById(this.id).pipe(first()).subscribe({
        next:(_)=>{
          this.form.patchValue(_);         
        }
      })   
    }
    if (this.makeId) {
      this.vehicleMakeService
        .findById(this.makeId)
        .pipe(first())
        .subscribe({
          next:(_)=>{
            this.addbcItem(_.name)
            this.addbcItem("Model")
            this.addbcItem(this.pageTitle,true)
          }
        });
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: VehicleModel = cloneDeep(this.form.value)    
      this.vehicleModelService.save(model).subscribe({
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


