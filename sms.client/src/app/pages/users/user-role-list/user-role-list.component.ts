import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { UserRoleService } from '../../../shared/services/user-role.service';
import { Role } from '../../../shared/models/users/role';





@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss']
})
export class UserRoleListComponent extends BasePagedListComponent implements OnInit {
  items: Role[]=[];
  constructor(private userRoleService:UserRoleService) { super()}

  ngOnInit(): void {
    this.pageTitle="List"
    this.breadCrumbItems=[
      {label:"User Management"},
      {label:"Role"},
      {label:this.pageTitle,active:true}
    ]
    this.loadItems();
  }

  loadItems() {
    this.userRoleService.list(this.page, this.pageSize, this.search)
      .pipe(first())
      .subscribe(s => {
        this.items = s.data;
        this.totalCount = s.metaData.totalCount;
      });

  }
  delete(id: any){
    debugger
    this.userRoleService.delete(id)
      .pipe(first())
      .subscribe(s => {
        this.loadItems();
      });
  }

}
