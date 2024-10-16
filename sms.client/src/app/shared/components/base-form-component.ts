import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BaseComponent } from './base-component';
import { FormHelper } from '../core/form-helper';

@Component({
  selector: 'app-base-paged-form',
  template: ` <div>base works!!</div> `,
})
export abstract class BaseFormComponent
  extends BaseComponent
  implements OnDestroy
{
  protected unsubscribe: Subject<Object | any>;
  editMode = false;
  buttonText!: string;
  button2Text: string="Save and Close";
  id!: string;
  error!: string;
  public close:boolean=false
  


  submitted = false;
  constructor() {
    super();
    this.unsubscribe = new Subject<Object>();
  }

  abstract createForm(): FormGroup;
  abstract initForm(): any;
  abstract back():any;
  
  save(close:boolean){ this.close=close}  
  
  

  onCancel() {
    this.submitted = false;
  }

  
  
  clearError() {
    this.error = '';
  }
  validateForm(formGroup: FormGroup): boolean {
    if (formGroup.valid) {
      return true;
    } else {
      FormHelper.validateAllFormFields(formGroup)
      //this.validateAllFormFields(formGroup);
      // this.findInvalidControls(formGroup) ;
      return false;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
