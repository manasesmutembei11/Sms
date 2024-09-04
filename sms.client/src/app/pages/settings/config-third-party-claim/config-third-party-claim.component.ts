import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { ThirdPartyClaimConfig } from '../../../shared/models/config-models';
import { EnumLookupItem, LookupItem } from '../../../shared/models/responses/lookup-item';
import { ConfigurationService } from '../../../shared/services/configuration.service';


@Component({
  selector: 'app-config-third-party-claim',
  templateUrl: './config-third-party-claim.component.html',
  styles: [
  ]
})
export class ConfigThirdPartyClaimComponent extends BaseFormComponent implements OnInit {

  form:FormGroup= this.fb.group({});
  @Input() configType :EnumLookupItem= {}  as EnumLookupItem
  claimNatures: LookupItem[]=[];
  constructor(
    public location: Location,
    private fb: FormBuilder,
    private configurationService:ConfigurationService
    ) { super()}

  ngOnInit(): void {
    this.form=this.createForm();
    this.initForm();
    this.configurationService.ClaimNaturelookuplistLookupList().pipe(first()).subscribe({
      next:(_)=>{
        this.claimNatures=_
      }
    });
  }

  createForm(): FormGroup {
    const f = this.fb.group({
      tracingClaimNatureID: [null],     
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
      const model = Object.assign(this.form.value) as ThirdPartyClaimConfig;
      this.configurationService.save(model)
        .subscribe({
          next: (_) => {
            console.log(" ThirdPartyClaimConfig Result => ",_);
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
