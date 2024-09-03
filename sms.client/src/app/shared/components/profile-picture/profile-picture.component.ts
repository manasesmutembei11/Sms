import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
  SimpleChanges,
} from '@angular/core';
import { FileItem, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {
  uploader: FileUploader;
  hasDragOver = false;
  @Input() editmode: boolean = false;
  @Input() url = '';
  @Input() refId!: string;
  @Input() photoId?: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['photoId'].currentValue && !this.url) {
      console.log('ng changes =>', changes);
      this.url = `${this.baseUrl}api/photoupload/view/${changes['photoId'].currentValue}`;
    }

    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }

  @Output() photoChange = new EventEmitter();
  fileItem!: FileItem;

  constructor(@Inject('BASE_URL') private baseUrl: string) {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}api/photoupload/upload`,
      //disableMultipart: false,
      allowedFileType: ['image'],
      autoUpload: true,
    });

    this.uploader.response.subscribe((res) => {
      if (res) {
        const photos: string[] = JSON.parse(res);
        console.log('photo upload response ==> ', photos);
        if (photos && photos.length > 0) {
          var photoId = photos[0];
          this.url = `${this.baseUrl}api/photoupload/view/${photoId}`;
          this.photoChange.emit(photoId);
        }
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
}
