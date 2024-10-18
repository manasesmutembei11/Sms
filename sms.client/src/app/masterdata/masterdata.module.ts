import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterdataRoutingModule } from './masterdata-routing.module';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentListComponent } from './department-list/department-list.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ValidityStyleDirective } from '../shared/directives/validity-style.directive';




@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentFormComponent


  ],
  imports: [
    CommonModule,
    MasterdataRoutingModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,

  ]
})
export class MasterdataModule { }
