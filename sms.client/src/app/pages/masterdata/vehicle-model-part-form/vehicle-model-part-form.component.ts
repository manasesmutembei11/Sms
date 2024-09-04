import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartService } from '../../../core/services/part.service';
import { Guid } from 'guid-typescript';
import { PartCategoryService } from '../../../core/services/part-category.service';
import { first } from 'rxjs';
import { EnumLookupItem, LookupItem } from '../../../shared/models/responses/lookup-item';
import { VehicleModelPartService } from '../../../core/services/vehicle-model-part.service';
import { BulkPart, BulkPartBodyType } from '../../../core/models/vehicle.models';
import { cloneDeep } from 'lodash';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-vehicle-model-part-form',  
  templateUrl: './vehicle-model-part-form.component.html',
})
export class VehicleModelPartFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  categories:LookupItem[]=[];
  groups: EnumLookupItem[]=[];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private vehicleModelPartService: VehicleModelPartService,
    private partCategoryService: PartCategoryService,
    private enumLookupService: EnumLookupService,
    private messageBoxService: MessageBoxService
  ) {
    super();
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Part' : 'New Part';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Part' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Add';
      this.initForm();
    });
    this.partCategoryService.lookupList().pipe(first()).subscribe({
      next:(_)=>this.categories=_
    })
    this.enumLookupService.partGroupList().pipe(first()).subscribe({
      next:(_)=>{
        this.groups=_
      }
    })
  }
  override createForm(): FormGroup<any> {
    const f = this.fb.group({
      partNumber: ['', [Validators.required]],
      name: ['', Validators.required], 
      categoryId: [null, Validators.required],    
      group: [null, Validators.required],    
      id: [Guid.create().toString()],
      bodyTypes: this.fb.array([])
    });
    return f;
  }
  override initForm() {
    this.enumLookupService.vehicleBodyTypeList().pipe(first()).subscribe({
      next:(_)=>{
        _.forEach(f=>{
          this.createBodyTypeForm({
            bodyType: f.id,
            bodyTypeName: f.name,
            checked: false
          })
        })
      }
    })
    
  }
  override back() {
   
  }
  get bodyTypes(): FormArray {
    return this.form.get('bodyTypes') as FormArray;
  }
  createBodyTypeForm(item: BulkPartBodyType) {
    const f = this.fb.group({
      bodyTypeName: [''],
      bodyType: [null],
      checked: [false],
    });
    f.patchValue(item);
    this.bodyTypes.push(f)

  }

  onSubmit(){
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: BulkPart = cloneDeep(this.form.value)
      var atleastOne=model.bodyTypes.some(s=>s.checked);
      debugger
      if(!atleastOne){
        this.messageBoxService.alert("You have to check atleast one body type to apply")
        return;
      }
      console.log("onSubmit =>",model);   
      this.vehicleModelPartService.addParts(model).subscribe({
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
  
}
