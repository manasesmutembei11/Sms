import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { FeeNote } from '../../../core/models/fee-note.models';
import { FeeNoteService } from '../../../core/services/fee-note.service';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';


@Component({
  selector: 'app-fee-note-list',
  templateUrl: './fee-note-list.component.html',
  styles: [
  ]
})
export class FeeNoteListComponent  extends BasePagedListComponent implements OnInit {
  items: FeeNote[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private feeNoteService: FeeNoteService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Invoicing" },
      { label: "Fee Note" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
 
 

  loadItems() {
    
    
    this.feeNoteService.list(this.page, this.pageSize, this.search)
      .pipe(first())
      .subscribe({
        next: (_) => {
          this.items = _.data;
          this.totalCount = _.metaData.totalCount;
        
        }
      });
    const params = {
      page: this.page,
    }
    this.router.navigate(["."], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge' });

  }

  download(id:string){
    this.feeNoteService.simpleDownload(id).pipe(first()).subscribe({
      next: (_: any) => {        
        if (_.body) {          
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob([_.body], { type: _.body.type }));
          const contentDisposition = _.headers.get('content-disposition');
          const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
          downloadLink.download = fileName.replaceAll('"', '');          
          downloadLink.click();
        }
      }
    })
  }

}
