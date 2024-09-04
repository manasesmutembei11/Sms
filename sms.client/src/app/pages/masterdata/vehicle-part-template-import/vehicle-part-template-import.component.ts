import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { first } from 'rxjs';
import { VehicleModelService } from '../../../core/services/vehicle-model.service';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { ImportResponse } from '../../../shared/models/basic-response';
import { AuthService } from '../../../shared/services/auth.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';

@Component({
  selector: 'app-vehicle-part-template-import',
  
  templateUrl: './vehicle-part-template-import.component.html',
})
export class VehiclePartTemplateImportComponent  extends BaseFormComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${this.baseUrl}api/VehiclePartTemplate/import`,
  });
  form: FormGroup = this.fb.group({});
  @ViewChild('fileInput') uploadElRef!: ElementRef;
 
  response: ImportResponse | any
  bodyTypes: EnumLookupItem[]=[];

  constructor(
    public location: Location,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string,
    private authService: AuthService,    
    private enumLookupService: EnumLookupService,
    private messageBox: MessageBoxService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    super()
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.pageTitle = "Import"
    this.addbcItem("Master Data")
    this.addbcItem("Vehicle Part Template")
    this.addbcItem(this.pageTitle, true)

    this.buttonText = 'Submit';
    this.enumLookupService.vehicleBodyTypeList().pipe(first()).subscribe({
      next:(_)=>this.bodyTypes=_
    })
  }
  
  override createForm(): FormGroup<any> {
    const f = this.fb.group({
      id: [Guid.create().toString()],
      bodyType: [null, [Validators.required]],
      fileSelected: [false, Validators.requiredTrue],
    });
    return f;
  }
  override initForm() {

  }
  override back() {

    
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
    this.response = null
    if (this.validateForm(this.form)) {
      this.uploader.authToken = `Bearer ${this.authService.getUserToken()}`;
      this.uploader.options.additionalParameter = this.form.value;
      this.uploader.onCompleteItem = this.completed
      this.uploader.response.pipe(first()).subscribe({
        next: (_) => {

          this.response = JSON.parse(_);
          if (this.response.status && !this.response.data ) {
            console.log(`response next =>`, this.response);
            this.uploadElRef.nativeElement.value = '';
            this.form.patchValue({ fileSelected: false });
            this.messageBox.toastSuccess("Imported successfully")
            this.router.navigate(["/masterdata/import-part-template"])
          
          } else {
            console.log(`completed error =>`, this.response);
            this.uploadElRef.nativeElement.value = '';
            this.form.patchValue({ fileSelected: false });
            this.messageBox.toastWarning("Imported successfully")
          }


        },
        error: (_) => {
          this.response = JSON.parse(_);
          console.log(`completed error =>`, this.response);
          this.uploadElRef.nativeElement.value = '';
          this.form.patchValue({ fileSelected: false });
        }
      })
      this.uploader.uploadAll();
    }
  }
  completed(fileItem: FileItem, response: string, status: number, headers: any) {
    //console.log(`completed => response = ${response}  status=${status}`, fileItem);
    fileItem.remove()


  }

}

