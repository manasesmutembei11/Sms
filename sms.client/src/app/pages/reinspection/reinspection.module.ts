import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../../shared/shared.module';
import { ReinspectionRoutingModule } from './reinspection-routing.module';






@NgModule({
  declarations: [
    
    
    
  ],
  imports: [
    CommonModule,
    ReinspectionRoutingModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    FormsModule,
    NgbModalModule,
    SweetAlert2Module.forRoot()

  ]
})
export class ReinspectionModule { }
