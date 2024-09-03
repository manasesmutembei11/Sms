import { Component, Inject, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { DocumentUploadType } from '../../models/uploads/document-upload-type';
import { DocumentUploadService } from '../../services/document-upload.service';
import JsFileDownloader from 'js-file-downloader';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-document-upload-view',
  templateUrl: './document-upload-view.component.html',
  styles: [
  ]
})
export class DocumentUploadViewComponent implements OnInit {

  @Input() refId!: string;
  @Input() operationTypeId!: number;
  documents: DocumentUploadType[]=[];
  constructor(
    private documentService: DocumentUploadService,
    private authService:AuthService,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  ngOnInit() {
    this.loadUploads();

  }
   loadUploads() {
    // this.documentService.getDocuments(this.operationTypeId, this.refId).pipe(first()).subscribe(data => {
    //   this.documents = data;
    // });
    debugger
    this.documentService.getUploadedDocuments( this.refId).pipe(first()).subscribe(data => {
      this.documents = data;
    });
  }
  download(id:string) {
    new JsFileDownloader({
      url: `${this.baseUrl}api/DocumentUpload/download/${id}`,
      headers: [
        { name: 'Authorization', value: `Bearer ${this.authService.getUserToken()}` }
      ]
    })

  }
  prepareUri(id:string):string{
    return  `${this.baseUrl}api/DocumentUpload/download/${id}`
  }

}
