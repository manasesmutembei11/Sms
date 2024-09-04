import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { DocumentTemplate } from '../../../shared/models/document-template.model';
import { DocumentTemplateService } from '../../../shared/services/document-template.service';


@Component({
  selector: 'app-document-template-list',
  templateUrl: './document-template-list.component.html',
  styles: [
  ]
})
export class DocumentTemplateListComponent extends BasePagedListComponent implements OnInit {
  items: DocumentTemplate[]=[];

  constructor(
    private documentTemplateService: DocumentTemplateService
  ) {  super()
    this.pageSize=20
  }

  ngOnInit(): void {
    this.pageTitle="List"
    this.breadCrumbItems=[
      {label:"Setting"},
      {label:"Document Template"},
      {label:this.pageTitle,active:true}
    ]
    this.loadItems()
  }

  loadItems() {
    this.documentTemplateService.list(this.page, this.pageSize, this.search)
    .pipe(first())
    .subscribe(s => {
      this.items = s.data;
      this.totalCount = s.metaData.totalCount;
    });
  }

}
