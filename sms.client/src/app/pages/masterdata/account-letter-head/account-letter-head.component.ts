import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-account-letter-head',  
  templateUrl: './account-letter-head.component.html',
})
export class AccountLetterHeadComponent extends BaseComponent implements OnInit {
  accountId: any;  
  constructor(
    private route: ActivatedRoute,    
    public location:Location,   
    private accountService:AccountService,
  ){
    super()
  }
  ngOnInit(): void {
    this.prepareTitle();   
    this.route.params.pipe().subscribe((params) => {
      this.accountId = params['accountId'] ? params['accountId'] : '';         
       this.init()
    });
    
  }
  init(){
    this.accountService.findById(this.accountId).pipe(first()).subscribe({
      next:(_)=>{
        this.addbcItem(_.typeName)
        this.addbcItem(_.name)        
        this.addbcItem(this.pageTitle,true)
        
      }
    })
  }
  prepareTitle(){
    this.breadCrumbItems=[]
    this.pageTitle = 'Letter Head';
    this.addbcItem("Master Data")  
    
  }
  back(){
    this.location.back()
  }

}
