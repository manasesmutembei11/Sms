import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { de } from 'date-fns/locale';

import { FileUploader, FileItem } from 'ng2-file-upload';
import { DocumentUploadType, DocumentUploadTypeItem } from '../../models/uploads/document-upload-type';
//import { AuthenticationService } from 'src/app/_services';

import { DocumentUploadService } from '../../services/document-upload.service';

@Component({
  selector: 'app-document-upload-item',
  templateUrl: './document-upload-item.component.html',
  styleUrls: ['./document-upload-item.component.scss'],
})
export class DocumentUploadItemComponent implements OnInit {
  @Input() doc!: DocumentUploadType 
  @Input() refId: string | undefined;
  @Input() operationId: number = 0;
  @Output() documentUploadTypeChangedEvent = new EventEmitter();
  @ViewChild('fileInput') uploadElRef!: ElementRef
  public uploader: FileUploader
  uri = `${this.baseUrl}api/documentupload/upload`;
  allowedMimeTypes: string = '';
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private documentService: DocumentUploadService
  ) //private authService: AuthenticationService
  {
    this.uploader = new FileUploader({
      url: this.uri,
      isHTML5: true,
      
      
      
      //authToken: `Bearer ${this.authService.currentUserValue.access_token}`,
    });
  }

  
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  ngOnInit() {
    this.allowedMimeTypes = this.doc.mimeTypes.map(s => s.type).join(",");
    var uploaderMimeType = this.doc.mimeTypes.map(s => s.type)
    this.uploader.setOptions({
      allowedMimeType: uploaderMimeType,
      url: this.uri,    
    })

    this.uploader.options.additionalParameter = {
      refId: this.refId,
      operationId: this.operationId,
      uploadTypeId: this.doc.uploadId,
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: any
    ) => {
      const data: DocumentUploadTypeItem = JSON.parse(response);
      item.fileRef=data;
      const file = this.doc.items.find((s) => s.fileName === data.fileName);
      if (!file) {
        this.doc.items.push(data);
      } else {
        file.id = data.id;
      }
      this.documentUploadTypeChangedEvent.emit();
    };
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {


      const exist = this.uploader.queue.find(
        (s) => s.file.name === fileItem.file.name && s.isUploaded
      );
      if (exist) {
        fileItem.remove();
      }
       this.uploadElRef.nativeElement.value = ''

    };
    this.uploader.onWhenAddingFileFailed = (fileItem, filter) => {
     
      if (filter.name = "mimeType") {
        var message= this.doc.mimeTypes.map(s=>s.name).join(',')
        alert(`Uploaded file types is not supported for (${this.doc.name.toUpperCase()}),\n\nthese are the supported file Types : ${message}`.toUpperCase());
      }
    }

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  onFileSelected(event:any) {

    this.uploader.uploadAll();
  }
  removeFile(fileItem: any) {

    this.uploader.removeFromQueue(fileItem);
    const docFile:DocumentUploadTypeItem=fileItem.fileRef as DocumentUploadTypeItem
    this.documentService.delete(docFile).subscribe({
      next: (_) => {
        this.doc.items = this.doc.items.filter((f) => f.id !== docFile.id);

        this.documentUploadTypeChangedEvent.emit();
      },
      error: (errors) => {
        //this.errors = errors;
        //console.log('Error =>', this.errors);
      },
    });



  }
  itemAlreadyUploaded(): DocumentUploadTypeItem[] {
    const files = this.uploader.queue.map((s) => s.file.name);
    return this.doc.items.filter((s) => !files.includes(s.fileName));
  }
  removeAlreadyUploadedFile(item: DocumentUploadTypeItem) {

    this.documentService.delete(item).subscribe({
      next: (_) => {
        console.log("doc=> ",this.doc);
        this.doc.items = this.doc.items.filter((f) => f.id !== item.id);
        this.documentUploadTypeChangedEvent.emit();
      },
      error: (errors) => {
        //this.errors = errors;
        //console.log('Error =>', this.errors);
      },
    });


  }
}
