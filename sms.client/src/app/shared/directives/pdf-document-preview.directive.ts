import { Directive, HostListener, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfPreviewModalComponent } from '../components/pdf-preview-modal/pdf-preview-modal.component';

@Directive({
  selector: '[appPdfPreview]'
})
export class PdfDocumentPreviewDirective {
  @Input() appPdfPreview!:string;
  constructor( private modalService: NgbModal,) { }

  @HostListener('click', ['$event']) onClick($event:any){
    console.info('clicked: ' + this.appPdfPreview);

    const modalRef = this.modalService.open(PdfPreviewModalComponent, {
      backdrop: 'static',
      size: 'xl',
    });
    modalRef.componentInstance.url = this.appPdfPreview;
    
    modalRef.closed.subscribe((data) => {
     
    });
    modalRef.dismissed.subscribe((data) => console.log('Modal =>', data));
}

}
