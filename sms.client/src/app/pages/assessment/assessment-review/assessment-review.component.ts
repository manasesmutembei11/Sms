import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from '../../../core/services/area.service';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { AssessmentService } from '../../../core/services/assessment.service';
import { Guid } from 'guid-typescript';
import { ReviewAssessment, ReviewAssessmentAction } from '../../../core/models/assessment.models';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-assessment-review',

  templateUrl: './assessment-review.component.html',
})
export class AssessmentReviewComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  actions: ReviewAssessmentAction[] = [];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private assessmentService: AssessmentService,
    private messageBox: MessageBoxService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = 'Assessment Review';
      this.breadCrumbItems = [
        { label: 'Operations' },
        { label: 'Assessment' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = 'Submit';
      this.initForm();
    });
  }
  createForm(): FormGroup {
    const f = this.fb.group({
      remarks: ['', [Validators.required]],
      selectedAction: [null, [Validators.required]],
      assessmentId: [null],
    });
    return f;
  }
  initForm() {
    this.assessmentService.getReviewActions(this.id).pipe(first()).subscribe({
      next: (_) => {
        this.form.patchValue(_);
        this.actions = _.actions;
      }, error: (error) => {
        console.log("error => ", error);
        this.location.back();
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      this.messageBox.confirm("Are you sure you want to submit this assessment review?").then(result => {
        if (result.isConfirmed) {
          const model: ReviewAssessment = cloneDeep(this.form.value)
          this.assessmentService.review(model).subscribe({
            next: (_) => {
              this.location.back();
            },
            error: (errors) => {
              this.errors = errors;
              console.log('Error =>', this.errors);
            },
          });

        }
      })

    }
  }
  back(): void {
    this.location.back();
  }
}
