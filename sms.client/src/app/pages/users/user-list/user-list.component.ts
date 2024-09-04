import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';

import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/users/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BasePagedListComponent implements OnInit {
  items: User[]=[];



  constructor(private userService:UserService) { super();}

  ngOnInit(): void {
    this.loadItems()
    this.pageTitle="List"
    this.breadCrumbItems=[
      {label:"User Management"},
      {label:"User"},
      {label:this.pageTitle,active:true}
    ]
  }

  loadItems() {
    this.userService.list(this.page, this.pageSize, this.search)
    .pipe(first())
    .subscribe(s => {
      this.items = s.data;
      this.totalCount = s.metaData.totalCount;
    });
  }
  activate(user:User){
    let confirmed = confirm("Are you sure you want to activate this user?");
    if(confirmed){
      this.userService
        .activate(user)
        .subscribe({
          next: (_)=> {
            this.loadItems()
          },
          error: (errors) => {
            this.errors = errors;
            console.log('Error =>', this.errors);
          }
        });
    }
  }

  resendEmailConfirmation(user:User){
    let confirmed = confirm("Are you sure you want to resedn email confirmation request this user?");
    if(confirmed){
      this.userService
        .resendEmailConfirmation(user)
        .subscribe({
          next: (_)=> {
            this.loadItems()
          },
          error: (errors) => {
            this.errors = errors;
            console.log('Error =>', this.errors);
          }
        });
    }
  }

}
