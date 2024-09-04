import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeeNoteListComponent } from './fee-note-list/fee-note-list.component';
import { AuthGuard } from '../../shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'feenote',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: FeeNoteListComponent, pathMatch: 'full',},
     
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicingRoutingModule { }
