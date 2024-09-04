import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { EmailContact, SmsContact, AppNotificationForm } from '../../../shared/models/notification.models';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { NotificationService } from '../../../shared/services/notification.service';


@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styles: [
  ]
})
export class NotificationFormComponent extends BaseFormComponent implements OnInit {
  placeHolder="{TaskNo}, {RiskNo},{ClaimNo}, {TaskType}";
  form: FormGroup = this.fb.group({});
  contactTypes: EnumLookupItem[] = [];
  notificationTypes: EnumLookupItem[] = [];
  emailTemplateType: EnumLookupItem[] = [];
  smsTemplateType: EnumLookupItem[] = [];
  emailAddressTypes: EnumLookupItem[] = [];



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private notificationService: NotificationService,
    private enumLookupService: EnumLookupService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();

    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Notification' : 'New Notification';
      this.breadCrumbItems = [
        { label: 'Master Data' },
        { label: 'Notification' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
    this.enumLookupService.appContactTypeList().pipe(first()).subscribe({
      next: (_) => this.contactTypes = _
    })
    this.enumLookupService.appNotificationTypeList().pipe(first()).subscribe({
      next: (_) => this.notificationTypes = _
    })
  
    this.enumLookupService.emailAddressTypeList().pipe(first()).subscribe({
      next: (_) => this.emailAddressTypes = _
    })



  }




  createForm(): FormGroup {
    const f = this.fb.group({
      description: ['', Validators.required],
      type: [null, Validators.required],
      enableEmail: [false, Validators.required],
      enableSms: [false, Validators.required],
      id: [Guid.create().toString()],
      emailNotification: this.fb.group({
        id: [Guid.create().toString()],
        subject: ['', Validators.required],
        template: [null],
        emailContacts: this.fb.array([]),
      }),
      smsNotification: this.fb.group({
        id: [Guid.create().toString()],
        template: [null],
        smsContacts: this.fb.array([]),
      })
    });
    f.controls["smsNotification"].controls["smsContacts"].setValidators(AtLeastOneSmsContactCheckedValidator(f.controls["enableSms"]))
    f.controls["emailNotification"].controls["emailContacts"].setValidators(AtLeastOneEmailContactCheckedValidator(f.controls["enableEmail"]))
    return f;
  }

  get emailContactsFormArray(): FormArray {
    return this.form.get("emailNotification")?.get("emailContacts") as FormArray
  }
  get smsContactsFormArray(): FormArray {
    return this.form.get("smsNotification")?.get("smsContacts") as FormArray
  }
  createEmailContactForm(item: EmailContact) {
    const f = this.fb.group({
      id: [''],
      contactType: [''],
      contactTypeName: [''],
      addressType: [null],
      notificationEmailId: [null]
    });
    f.patchValue(item);
    const fa = this.emailContactsFormArray;
    fa.push(f);
  }
  createSmsContactForm(item: SmsContact) {
    const f = this.fb.group({
      id: [''],
      contactType: [''],
      contactTypeName: [''],
      checked: [false],
      notificationSmsId: [null]
    });
    f.patchValue(item);
    const fa = this.smsContactsFormArray;
    fa.push(f);
  }
  initForm() {
    if (this.editMode) {
      this.notificationService
        .findById(this.id)
        .pipe(first())
        .subscribe((data) => {
          this.form.patchValue(data);
          if (data.emailNotification && data.emailNotification.emailContacts) {
            data.emailNotification.emailContacts.forEach(el => this.createEmailContactForm(el))
          }
          if (data.smsNotification && data.smsNotification.smsContacts) {
            data.smsNotification.smsContacts.forEach(el => this.createSmsContactForm(el))
          }
          this.enableEmailChanged();
          this.enableSmsChanged();
        });
    } else {
      this.notificationService
        .initialize()
        .pipe(first())
        .subscribe((data) => {
          this.form.patchValue(data);

          if (data.emailNotification && data.emailNotification.emailContacts) {
            data.emailNotification.emailContacts.forEach(el => this.createEmailContactForm(el))
          }
          if (data.smsNotification && data.smsNotification.smsContacts) {
            data.smsNotification.smsContacts.forEach(el => this.createSmsContactForm(el))
          }
          this.enableEmailChanged();
          this.enableSmsChanged();
        });
    }
  }
  enableEmailChanged() {
    console.log("enableEmailChanged");
   

    var controlSubject = this.form.get('emailNotification')?.get("subject")
    var controlTemplate = this.form.get('emailNotification')?.get("template")
    var controlEmailContact = this.form.get('emailNotification')?.get("emailContacts")
    if (this.form.value.enableEmail) {
      controlSubject?.setValidators([Validators.required]);
      controlTemplate?.setValidators([Validators.required]);
    } else {
      controlTemplate?.clearValidators();
      controlSubject?.clearValidators();
    }
    controlSubject?.updateValueAndValidity();
    controlTemplate?.updateValueAndValidity();
    controlEmailContact?.updateValueAndValidity();
  }
  enableSmsChanged() {
    var controlSmsContact = this.form.get('smsNotification')?.get("smsContacts")
    var controlTemplate = this.form.get('smsNotification')?.get("template")
    console.log("enableSmsChanged => ",this.form.value.enableSms);
    
    if (this.form.value.enableSms) {
      controlTemplate?.setValidators([Validators.required]);
    } else {
      controlTemplate?.clearValidators();
    }
    controlSmsContact?.updateValueAndValidity();
    controlTemplate?.updateValueAndValidity();
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: AppNotificationForm = cloneDeep(this.form.value)
      console.log("model => ", model);



      this.notificationService.save(model).subscribe({
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


export function AtLeastOneEmailContactCheckedValidator(enableEmailControl:AbstractControl): ValidatorFn | any {
  let minRequired = 1
  return function validate(formGroup: FormGroup) {
    let checked = 0
    
    if (formGroup instanceof FormArray) {
      let enableEmail = enableEmailControl.value  
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key]?.get("addressType")
       
        if (control  && parseInt(control.value)===1) {             
          checked++
        }
      })     
      if (checked < minRequired && enableEmail) {       
        return {
          requireAddressTypeTo: true,
        }
      }
    }

    return null
  }
}
export function AtLeastOneSmsContactCheckedValidator(enableSmsControl:AbstractControl): ValidatorFn | any {
  let minRequired = 1
  return function validate(formGroup: FormGroup) {
    let checked = 0
    
    if (formGroup instanceof FormArray) {
      let enableSms = enableSmsControl.value   
      
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key]?.get("checked")
        if (control && control.value) {
          checked++
        }
      })
      if (checked < minRequired && enableSms) {       
        return {
          requireCheckboxToBeChecked: true,
        }
      }
    }

    return null
  }
}


