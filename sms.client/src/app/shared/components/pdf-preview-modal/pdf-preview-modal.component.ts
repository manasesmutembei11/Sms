import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { PDFProgressData } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-preview-modal',
  templateUrl: './pdf-preview-modal.component.html',
  styleUrls: ['./pdf-preview-modal.component.scss']
})
export class PdfPreviewModalComponent implements OnInit {

  @Input() url = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc: any
  
  loading:boolean=false
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.pdfSrc = {
      url: this.url,
      withCredentials: true,
      httpHeaders: {
        Authorization: `Bearer ${this.authService.getUserToken()}`,
      }
    }
    this.loading=true;
  }
  
  onProgress(progressData: PDFProgressData) {
    // do anything with progress data. For example progress indicator
    if(progressData.loaded==progressData.total){
      this.loading=false
    }
    console.log("Progress =>", progressData);
    
  }
}
