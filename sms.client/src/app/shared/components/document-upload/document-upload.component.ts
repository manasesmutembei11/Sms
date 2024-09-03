import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { first } from 'rxjs/operators';
import { DocumentUploadType } from '../../models/uploads/document-upload-type';

import { DocumentUploadService } from '../../services/document-upload.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit, OnChanges {
  @Input() refId: string="";
  @Input() operationTypeId: number=0;
  @Output() documentsChangedEvent = new EventEmitter<DocumentUploadType[]>();

  documents: DocumentUploadType[]=[];
  constructor(
    private documentService: DocumentUploadService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["refId"].currentValue){
      this.loadUploads();
    }
  }

  ngOnInit() {
    

  }
   loadUploads() {
    console.log("loadUploads =>Refid => ",this.refId);
    
    this.documentService.getDocuments(this.operationTypeId, this.refId).pipe(first()).subscribe(data => {
      this.documents = data;
      this.documentsChangedEvent.emit(this.documents);
    });
  }

  documentTypeUpdated() {
    //this.loadUploads();
    this.documentsChangedEvent.emit(this.documents);
  }
  onSubmit(){}
}
