import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';
import { Charge } from '../../../core/models/master-data.models';
import { ChargeService } from '../../../core/services/charge.service';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';


@Component({
  selector: 'app-charge-form',
  templateUrl: './charge-form.component.html',
  styles: [
  ]
})
export class ChargeFormComponent extends BaseFormComponent  implements OnInit {
  form: FormGroup = this.fb.group({});
  chargeTypes: EnumLookupItem[]=[];
 
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location, 
    private chargeService: ChargeService,
    private enumLookupService: EnumLookupService
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Charge' : 'New Charge';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Charge' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });  
    

    this.enumLookupService.chargeTypeList().pipe(first()).subscribe({
      next:(_)=>{
        this.chargeTypes=_
      }
    })
  }
  
  


  createForm(): FormGroup {
    const f = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', Validators.required],  
      description: ['', Validators.required],   
      chargeType: [null, Validators.required], 
      requireDescription: [false],  
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.chargeService
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
      const model: Charge = cloneDeep(this.form.value)
    
      this.chargeService.save(model).subscribe({
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
