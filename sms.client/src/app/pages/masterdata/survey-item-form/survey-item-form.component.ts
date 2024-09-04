import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';
import { SurveyItem } from '../../../core/models/master-data.models';
import { SurveyItemService } from '../../../core/services/survey-item.service';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { EnumLookupItem, LookupItem } from '../../../shared/models/responses/lookup-item';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';

@Component({
  selector: 'app-survey-item-form',
  templateUrl: './survey-item-form.component.html',
  styles: []
})
export class SurveyItemFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  surveyItemTypes: EnumLookupItem[]=[];
 
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location, 
    private surveyItemService: SurveyItemService,
    private enumLookupService: EnumLookupService
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Survey Item' : 'New Survey Item';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Survey Item' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });  
    

    this.enumLookupService.surveyItemTypeList().pipe(first()).subscribe({
      next:(_)=>{
        this.surveyItemTypes=_
      }
    })
  }
  
  


  createForm(): FormGroup {
    const f = this.fb.group({
      name: ['', Validators.required],  
      no: ['', Validators.required],   
      type: [null, Validators.required], 
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.surveyItemService
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
      const model: SurveyItem = cloneDeep(this.form.value)
    
      this.surveyItemService.save(model).subscribe({
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
