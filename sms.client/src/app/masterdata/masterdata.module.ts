import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterdataRoutingModule } from './masterdata-routing.module';

import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [


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
