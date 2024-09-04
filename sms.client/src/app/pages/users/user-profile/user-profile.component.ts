import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base-component';
import { UserProfileService } from '../../../shared/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ]
})
export class UserProfileComponent  extends BaseComponent implements OnInit {

  
  constructor(
    private route: ActivatedRoute,    
    public location:Location,   
    private userService:UserProfileService,
    
  ){
    super()
  }
  ngOnInit(): void {
    this.prepareTitle();   
    this.route.params.pipe().subscribe((params) => {
      this.userId = params['id'] ? params['id'] : '';         
       this.init()
    });
    
  }
  init(){
    this.userService.findById(this.userId).pipe(first()).subscribe({
      next:(_)=>{       
        this.addbcItem(`${_.firstName} ${_.lastName}`)        
        this.addbcItem(this.pageTitle,true)
        
      }
    })
  }
  prepareTitle(){
    this.breadCrumbItems=[]
    this.pageTitle = 'Profile';
    this.addbcItem("Account")
   
    
  }
  back(){
    this.location.back()
  }

}
