import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { AppGroupContact } from '../../../shared/models/group-contact';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { GroupContactService } from '../../../shared/services/group-contact.service';


@Component({
  selector: 'app-group-contact-form',
  templateUrl: './group-contact-form.component.html',
  styles: [
  ]
})
export class GroupContactFormComponent extends BaseFormComponent  implements OnInit {
  form: FormGroup = this.fb.group({});
  contactTypes: EnumLookupItem[]=[];
 
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location, 
    private groupContactService: GroupContactService,
    private enumLookupService: EnumLookupService
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Group Contact' : 'New Group Contact';
      this.breadCrumbItems = [
        { label: 'Setting' },
        { label: 'Group Contact' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
    this.enumLookupService.appGroupContactTypeList().pipe(first()).subscribe({
      next:(_)=>this.contactTypes=_
    })
    

  }
  
  


  createForm(): FormGroup {
    const f = this.fb.group({
      contactType: [null, [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      phone: [null, Validators.required],      
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.groupContactService
        .findById(this.id)
        .pipe(first())
        .subscribe((data) => { 
          data.phone= {phoneNumber:data.phone};        
          this.form.patchValue(data);         
        });
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: AppGroupContact = cloneDeep(this.form.value)
      model.phone = model.phone.intelNumber;
      this.groupContactService.save(model).subscribe({
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
