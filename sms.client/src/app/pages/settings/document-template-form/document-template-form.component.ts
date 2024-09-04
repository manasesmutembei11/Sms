import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { de } from 'date-fns/locale';
import { Guid } from 'guid-typescript';
import { FileUploader } from 'ng2-file-upload';
import { first } from 'rxjs';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { DocumentTemplateService } from '../../../shared/services/document-template.service';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-document-template-form',
  templateUrl: './document-template-form.component.html',
  styles: [],
})
export class DocumentTemplateFormComponent
  extends BaseFormComponent
  implements OnInit
{
  uploader: FileUploader = new FileUploader({
    url: `${this.baseUrl}api/DocumentTemplate/save`,
  });
  form: FormGroup = this.fb.group({});
  templateTypes: EnumLookupItem[] = [];
  @ViewChild('fileInput') uploadElRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public location: Location,
    private service: DocumentTemplateService,
    private enumLookupService: EnumLookupService,
    private authService: AuthService,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    super();

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit  Template' : 'New  Template';
      this.breadCrumbItems = [
        { label: 'Setting' },
        { label: 'Document Template' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
    this.enumLookupService
      .documentTypeList()
      .pipe(first())
      .subscribe((data) => (this.templateTypes = data));

    this.uploader.response.subscribe({
      next: (_: any) => {
        var response = JSON.parse(_);
        if (response.status) {
          this.location.back();
        } else {
          this.uploadElRef.nativeElement.value = '';
          this.form.patchValue({ fileSelected: false });
          this.errors = response.errors;
        }
      },
      error: (errors: any) => {
        this.errors = errors;
        console.log('Error =>', this.errors);
      },
    });
  }

  createForm(): FormGroup {
    const f = this.fb.group({
      name: ['', Validators.required],
      documentTemplateType: [null, Validators.required],
      fileSelected: [false, Validators.requiredTrue],
      id: [Guid.create().toString()],
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.service
        .findById(this.id)
        .pipe(first())
        .subscribe((data) => {
          this.form.patchValue(data);
        });
    }
  }
  changed(files: any) {
    let selected = false;
    if (files.length > 0) {
      selected = true;
    }
    this.form.patchValue({ fileSelected: selected });
  }
  onSubmit() {
    this.submitted = true;
    this.errors = [];
    if (this.validateForm(this.form)) {
      this.uploader.authToken = `Bearer ${this.authService.getUserToken()}`;
      this.uploader.options.additionalParameter = this.form.value;
      this.uploader.uploadAll();
    }
  }
  back() {
    this.location.back()
  }
}
