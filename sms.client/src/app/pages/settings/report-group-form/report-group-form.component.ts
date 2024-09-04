import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { CustomValidators } from '../../../shared/custom-validators/custom-validators';
import { ReportGroup } from '../../../shared/models/reports/report-group';
import { ReportGroupService } from '../../../shared/services/report-group.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-report-group-form',
  templateUrl: './report-group-form.component.html',
  styleUrls: ['./report-group-form.component.scss']
})
export class ReportGroupFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({})


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public location: Location,
    private service: ReportGroupService
  ) { super() }

  ngOnInit(): void {

    this.form = this.createForm();
    this.route.params.pipe().subscribe(params => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit  Group' : 'New  Group';
      this.breadCrumbItems = [
        { label: "Setting" },
        { label: "Report Group" },
        { label: this.pageTitle, active: true }
      ]
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
  }

  createForm(): FormGroup {
    const f = this.fb.group({
      no: ['', [Validators.required, CustomValidators.numeric]],
      name: ['', Validators.required],
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.service.findById(this.id).pipe(first()).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model = Object.assign(this.form.value) as ReportGroup;
      console.log('model', model);

      this.service
        .save(model)
        .subscribe({
          next: (_) => {
            this.location.back()
            //this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (errors) => {
            this.errors = errors;
            console.log('Error =>', this.errors);
          }
        });

    }
  }
  back() {
    this.location.back()
  }
}
