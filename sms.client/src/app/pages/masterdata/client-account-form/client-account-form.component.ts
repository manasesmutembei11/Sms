import { Location } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { ClientAccountService } from '../../../core/services/client-account.service';
import { ClientAccount } from '../../../core/models/client-account.models';

@Component({
  selector: 'app-client-account-form',
  templateUrl: './client-account-form.component.html',
  styles: []
})
export class ClientAccountFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,   
    private clientAccountService: ClientAccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Client Account ' : 'New Client Account ';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Client Account' },
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
      taxNo: [null,Validators.required],
      postalAddress: ['',Validators.required],
      postalCode: ['',Validators.required],
      physicalAddress: ['',Validators.required],
      contactPersonName: ['',Validators.required],
      contactPersonPhoneNumber: ['',Validators.required],
      contactPersonEmail: ['',[Validators.required,Validators.email]],
      street: ['',Validators.required],
      town: ['',Validators.required],
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.clientAccountService
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
      const model: ClientAccount = {...this.form.value};      
      this.clientAccountService.save(model).subscribe({
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
