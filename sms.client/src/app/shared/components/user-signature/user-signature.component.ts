import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Guid } from 'guid-typescript';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { Observable, first } from 'rxjs';
import { BasicResponse } from '../../models/basic-response';

@Component({
  selector: 'app-user-signature',
  templateUrl: './user-signature.component.html',
  styleUrls: ['./user-signature.component.scss'],
})
export class UserSignatureComponent implements OnInit {
  uploader: FileUploader;
  hasDragOver = false;
  @Input() editmode: boolean = false;
  @Input() url = '';
  @Input() userId!: string;
  
  
 
  @Output() photoChange = new EventEmitter();
  fileItem!: FileItem;

  ngOnChanges(changes: SimpleChanges) {
    console.log('ng changes =>', changes);
    if (changes["userId"] && changes["userId"].currentValue) {
      this.check().pipe(first()).subscribe({
        next:(_)=>{        
          if(_.status){
            this.url = `${this.baseUrl}api/UserSignatureUpload/view/${this.userId}`;
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
      url: `${this.baseUrl}api/UserSignatureUpload/upload`,
      //disableMultipart: false,
      allowedFileType: ['image'],
      autoUpload: true,
    });

    this.uploader.response.subscribe((res) => {
         
      if (res) {
        var p =Guid.create().toString();
        this.url = `${this.baseUrl}api/UserSignatureUpload/view/${this.userId}?changeId=${p}`;       
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
      userId: this.userId,
    };
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.fileItem = fileItem;
    };
    

  }
  private check = (): Observable<BasicResponse> => {
    return this.http.get<BasicResponse>(`${this.baseUrl}api/UserSignatureUpload/exist/${this.userId}`);
    
  };
}
