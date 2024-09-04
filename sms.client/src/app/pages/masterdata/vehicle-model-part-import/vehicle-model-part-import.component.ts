import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';
import { Guid } from 'guid-typescript';
import { VehicleModelService } from '../../../core/services/vehicle-model.service';
import { first } from 'rxjs';
import { ImportResponse } from '../../../shared/models/basic-response';

@Component({
  selector: 'app-vehicle-model-part-import',
  templateUrl: './vehicle-model-part-import.component.html',
})
export class VehicleModelPartImportComponent extends BaseFormComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${this.baseUrl}api/VehicleModelPart/import`,
  });
  form: FormGroup = this.fb.group({});

  @ViewChild('fileInput') uploadElRef!: ElementRef;
  modelId: any;
  response: ImportResponse | any

  constructor(
    public location: Location,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string,
    private authService: AuthService,
    private vehicleModelService: VehicleModelService,
    private messageBox: MessageBoxService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    super()
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.pageTitle = "Import"
    this.route.params.pipe().subscribe((params) => {
      this.modelId = params['modelId'] ? params['modelId'] : '';
      if (!this.modelId) {
        this.messageBox.toastWarning("Invalid model Id")
        this.location.back();
      }
      this.form.patchValue({modelId:this.modelId})
      this.prepareTitle()
    })

    this.buttonText = 'Submit';
  }
  prepareTitle() {
    this.breadCrumbItems = []
    this.addbcItem("Master Data")
    this.addbcItem("Vehicle Model Part")
    if (this.modelId) {
      this.vehicleModelService
        .findById(this.modelId)
        .pipe(first())
        .subscribe({
          next: (_) => {
            this.addbcItem(_.name)
            this.addbcItem("Part")
            this.addbcItem(this.pageTitle, true)
          }
        });
    }
  }
  override createForm(): FormGroup<any> {
    const f = this.fb.group({
      id: [Guid.create().toString()],
      modelId: [null, [Validators.required]],
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
            this.router.navigate(["/accreditation/applicant"])
          
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
