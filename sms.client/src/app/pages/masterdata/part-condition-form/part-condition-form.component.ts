
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartConditionService } from '../../../core/services/part-condition.service';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { PartCondition } from '../../../core/models/vehicle.models';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-part-condition-form',
  templateUrl: './part-condition-form.component.html',
  styles: []
})
export class PartConditionFormComponent extends BaseFormComponent implements OnInit {

  
  form: FormGroup = this.fb.group({});
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private partConditionService: PartConditionService
  ) {
    super();
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Part Condition' : 'New Part Condition';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Part Condition' },
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
      hasMarkup: [0],
      hasDiscount: [0],
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.partConditionService.findById(this.id).pipe(first())
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
      const model: PartCondition = cloneDeep(this.form.value)
      console.log("onSubmit =>",model);
      

      this.partConditionService.save(model).subscribe({
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
