import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { ExpaqMateServerConfig } from '../../../shared/models/config-models';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { ConfigurationService } from '../../../shared/services/configuration.service';


@Component({
  selector: 'app-config-expaq-mate-server',  
  templateUrl: './config-expaq-mate-server.component.html',
})
export class ConfigExpaqMateServerComponent extends BaseFormComponent implements OnInit {
  form:FormGroup= this.fb.group({});
   @Input() configType :EnumLookupItem= {}  as EnumLookupItem
   constructor(
     public location: Location,
     private fb: FormBuilder,
     private configurationService:ConfigurationService
     ) { super()}
 
   ngOnInit(): void {
     this.form=this.createForm();
     this.initForm();
   }
 
   createForm(): FormGroup {
     const f = this.fb.group({
       serverUri: ['', [Validators.required]],      
       configType: [this.configType.id],
       id: [Guid.create().toString()],
     });
     return f;
 
   }
   initForm() {
 
     this.configurationService.getConfig(this.configType?.id).pipe(first()).subscribe(data => {
       this.form.patchValue(data);
     });
 
   }
   onSubmit(){
     this.submitted=true;
     if (this.validateForm(this.form)) {
       const model = Object.assign(this.form.value) as ExpaqMateServerConfig;
       this.configurationService.save(model)
         .subscribe({
           next: (_) => {
             console.log("Result => ",_);
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
 