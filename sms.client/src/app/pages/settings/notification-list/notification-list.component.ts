import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { AppNotification } from '../../../shared/models/notification.models';
import { NotificationService } from '../../../shared/services/notification.service';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styles: [
  ]
})
export class NotificationListComponent extends BasePagedListComponent implements OnInit {
  items: AppNotification[]=[];

  constructor(
    private notificationService: NotificationService
  ) {  super()
    this.pageSize=20
  }

  ngOnInit(): void {
    this.pageTitle="List"
    this.breadCrumbItems=[
      {label:"Setting"},
      {label:"Notifications"},
      {label:this.pageTitle,active:true}
    ]

    this.loadItems()
  }

  loadItems() {
    this.notificationService.list(this.page, this.pageSize, this.search)
    .pipe(first())
    .subscribe(s => {
      this.items = s.data;
      this.totalCount = s.metaData.totalCount;
    });
  }

}

