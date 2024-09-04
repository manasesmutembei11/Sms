import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { AppGroupContact } from '../../../shared/models/group-contact';
import { GroupContactService } from '../../../shared/services/group-contact.service';


@Component({
  selector: 'app-group-contact-list',
  templateUrl: './group-contact-list.component.html',
  styles: [
  ]
})
export class GroupContactListComponent extends BasePagedListComponent implements OnInit {
  items: AppGroupContact[]=[];


  constructor(
    private groupContactService: GroupContactService
   
  ) {  super()}

  ngOnInit(): void {
    this.pageTitle="List"
    this.breadCrumbItems=[
      {label:"Setting"},
      {label:"Group Contact"},
      {label:this.pageTitle,active:true}
    ]
    this.loadItems()
  }

  loadItems() {
    this.groupContactService.list(this.page, this.pageSize, this.search)
    .pipe(first())
    .subscribe(s => {
      this.items = s.data;
      this.totalCount = s.metaData.totalCount;
    });
  }

}
