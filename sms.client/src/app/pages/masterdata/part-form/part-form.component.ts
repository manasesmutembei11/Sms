
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartService } from '../../../core/services/part.service';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { Part } from '../../../core/models/vehicle.models';
import { cloneDeep } from 'lodash';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';

@Component({
  selector: 'app-part-form',
  templateUrl: './part-form.component.html',
  styles: []
})
export class PartFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  groups: EnumLookupItem[]=[];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private partService: PartService,
    private enumLookupService: EnumLookupService
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
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
    this.enumLookupService.partGroupList().pipe(first()).subscribe({
      next:(_)=>{
        this.groups=_
      }
    })
  }
  createForm(): FormGroup {
    const f = this.fb.group({
      partNumber: ['', [Validators.required]],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      group: [null, Validators.required],
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.partService.findById(this.id).pipe(first())
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
      const model: Part = cloneDeep(this.form.value)
      console.log("onSubmit =>",model);
      

      this.partService.save(model).subscribe({
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
