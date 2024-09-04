import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { CustomValidators } from '../../../shared/custom-validators/custom-validators';
import { MailServerConfig } from '../../../shared/models/config-models';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { ConfigurationService } from '../../../shared/services/configuration.service';



@Component({
  selector: 'app-config-mail-server',
  templateUrl: './config-mail-server.component.html',
  styles: [
  ]
})
export class ConfigMailServerComponent extends BaseFormComponent implements OnInit {

  form: FormGroup = this.fb.group({});
  @Input() configType: EnumLookupItem = {} as EnumLookupItem
  constructor(
    public location: Location,
    private fb: FormBuilder,
    private configurationService: ConfigurationService
  ) { super() }

  ngOnInit(): void {
    this.form = this.createForm();
    this.initForm();
  }

  createForm(): FormGroup {
    const f = this.fb.group({
      from: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      smtpServer: ['', Validators.required],
      smtpUserName: ['', [Validators.required, Validators.email]],
      smtpPassword: ['', Validators.required],
      smtpPort: new FormControl<number | any>(null, [Validators.required, CustomValidators.numeric]),
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
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: MailServerConfig = cloneDeep(this.form.value);
      model.smtpPort = parseInt(model.smtpPort.toString())
      debugger;
      this.configurationService.save(model)
        .subscribe({
          next: (_) => {
            console.log("Result => ", _);
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
