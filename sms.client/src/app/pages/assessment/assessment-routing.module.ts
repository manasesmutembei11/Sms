import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { FeeNoteFormComponent } from '../invoicing/fee-note-form/fee-note-form.component';

import { AssessmentDetailComponent } from './assessment-detail/assessment-detail.component';
import { AssessmentSubmitComponent } from './assessment-submit/assessment-submit.component';
import { AssessmentListPendingReviewComponent } from './assessment-list-pending-review/assessment-list-pending-review.component';
import { AssessmentReviewComponent } from './assessment-review/assessment-review.component';
const routes: Routes = [ 
  {
    path: 'assessment',
    canActivate: [AuthGuard],
    children: [     
      { path: '', component: AssessmentListComponent, pathMatch: 'full',},
      { path: ':taskId/create', component: AssessmentFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: AssessmentFormComponent},
      { path: ':taskId/feenote', component: FeeNoteFormComponent,pathMatch: 'full' },
      { path: 'submit/:id', component: AssessmentSubmitComponent,pathMatch: 'full' },
      { path: 'detail/:id', component: AssessmentDetailComponent,pathMatch: 'full' },
      { path: 'pending-review', component: AssessmentListPendingReviewComponent, pathMatch: 'full',},
      { path: 'review/:id', component: AssessmentReviewComponent, pathMatch: 'full',},
      
    ]
  },   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
