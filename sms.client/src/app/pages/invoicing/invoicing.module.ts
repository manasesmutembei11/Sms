import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicingRoutingModule } from './invoicing-routing.module';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SharedModule } from '../../shared/shared.module';
import { FeeNoteListComponent } from './fee-note-list/fee-note-list.component';
import { FeeNoteFormComponent } from './fee-note-form/fee-note-form.component';



@NgModule({
  declarations: [
    FeeNoteListComponent,
    FeeNoteFormComponent
  ],
  imports: [
    CommonModule,
    InvoicingRoutingModule,
    CommonModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    FormsModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbNavModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class InvoicingModule { }
