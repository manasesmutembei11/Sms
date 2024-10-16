import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterdataRoutingModule } from './masterdata-routing.module';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentListComponent } from './department-list/department-list.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    DepartmentListComponent


  ],
  imports: [
    CommonModule,
    MasterdataRoutingModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    SharedModule

  ]
})
export class MasterdataModule { }
