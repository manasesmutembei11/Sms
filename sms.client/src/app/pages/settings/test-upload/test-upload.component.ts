import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { FileUploader } from 'ng2-file-upload';
import { BaseComponent } from '../../../shared/components/base-component';


@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styles: [],
})
export class TestUploadComponent extends BaseComponent implements OnInit {
  uploader!: FileUploader;

  constructor(@Inject('BASE_URL') private baseUrl: string,
  private fb: FormBuilder) {super()}

  ngOnInit(): void {
    this.pageTitle="Dashboard"
    this.breadCrumbItems=[
      {label:"Home"},
      {label:this.pageTitle,active:true}
    ]
    this.uploader = new FileUploader({
      url: `${this.baseUrl}api/test/save`,
      disableMultipart: false, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    });
  }
  save() {
    var form = this.fb.group({
      name:["Juvenalis Gitau"],
      id:[Guid.create().toString()]
    });
    debugger;
    this.uploader.options.additionalParameter= form.value
    this.uploader.uploadAll();
  }


  id="D6D16973-8E2A-B192-288D-F68323295A91"



  updateDocuments($event: any){


  }
}
