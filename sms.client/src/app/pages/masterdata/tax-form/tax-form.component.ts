import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';
import { Tax } from '../../../core/models/master-data.models';
import { TaxService } from '../../../core/services/tax.service';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { CustomValidators } from '../../../shared/custom-validators/custom-validators';


@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styles: [
  ]
})
export class TaxFormComponent extends BaseFormComponent  implements OnInit {
  form: FormGroup = this.fb.group({});
 
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location, 
    private taxService: TaxService,
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Tax' : 'New Tax';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Tax' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
   
    

  }
  
  


  createForm(): FormGroup {
    const f = this.fb.group({
      code: ['', [Validators.required]],
      description: ['', Validators.required], 
      rate: [null,[ Validators.required,CustomValidators.percent]],        
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.taxService
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
      const model: Tax = cloneDeep(this.form.value)
    
      this.taxService.save(model).subscribe({
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

