import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Guid } from 'guid-typescript';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { Observable, first } from 'rxjs';
import { BasicResponse } from '../../models/basic-response';

@Component({
  selector: 'app-lettter-head-upload',
  templateUrl: './lettter-head-upload.component.html',
  styleUrls: ['./lettter-head-upload.component.scss'],
})
export class LettterHeadUploadComponent implements OnInit {
  uploader: FileUploader;
  hasDragOver = false;
  @Input() editmode: boolean = false;
  @Input() url = '';
  @Input() refId!: string;
 
  
 
  @Output() photoChange = new EventEmitter();
  fileItem!: FileItem;

  ngOnChanges(changes: SimpleChanges) {
    console.log('ng changes =>', changes);
    if (changes["refId"] && changes["refId"].currentValue) {
      console.log('ng changes Yes =>', changes);
      this.check().pipe(first()).subscribe({
        next:(_)=>{        
          if(_.status){
            this.url = `${this.baseUrl}api/LetterHeadUpload/view/${this.refId}`;
          }        
        }
      })
    }
   
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }

 

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    ) {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}api/LetterHeadUpload/upload`,
      //disableMultipart: false,
      allowedFileType: ['image'],
      autoUpload: true,
    });

    this.uploader.response.subscribe((res) => {
     
      if (res) {
        var p =Guid.create().toString();
        this.url = `${this.baseUrl}api/LetterHeadUpload/view/${this.refId}?changeId=${p}`;       
      }

      // Upload returns a JSON with the image ID
      //this.url = 'http://localhost:9090/get/' + JSON.parse(res).id;
      //this.urlChange.emit(this.url);
    });
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }

  ngOnInit() {
    this.uploader.options.additionalParameter = {
      refId: this.refId,
    };
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.fileItem = fileItem;
    }; 
  }
  private check = (): Observable<BasicResponse> => {
    return this.http.get<BasicResponse>(`${this.baseUrl}api/LetterHeadUpload/exist/${this.refId}`);
    
  };
}
