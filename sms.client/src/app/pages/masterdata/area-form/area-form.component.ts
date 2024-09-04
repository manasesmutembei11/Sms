import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';

import { Location } from '@angular/common';
import { Area } from '../../../core/models/area.model';
import { AreaService } from '../../../core/services/area.service';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { CustomValidators } from '../../../shared/custom-validators/custom-validators';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styles: [
  ]
})
export class AreaFormComponent extends BaseFormComponent  implements OnInit {
  form: FormGroup = this.fb.group({});
  areaTypes: EnumLookupItem[]=[];
 
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location, 
    private areaService: AreaService,
    private enumLookupService: EnumLookupService
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Area' : 'New Area';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Area' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });

    this.enumLookupService.areaTypeList().pipe(first()).subscribe({
      next:(_)=>{
        this.areaTypes=_
      }
    })
   
    

  }
  
  


  createForm(): FormGroup {
    const f = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', Validators.required],      
      areaType: [0,[CustomValidators.allowZero]],      
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.areaService
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
      const model: Area = cloneDeep(this.form.value)
    
      this.areaService.save(model).subscribe({
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
