import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../../shared/shared.module';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { PhotoUploadComponent } from '../../core/components/photo-upload/photo-upload.component';

import { AssessmentInfoComponent } from './assessment-info/assessment-info.component';
import { AssessmentDetailComponent } from './assessment-detail/assessment-detail.component';
import { AssessmentSubmitComponent } from './assessment-submit/assessment-submit.component';
import { AssessmentListPendingReviewComponent } from './assessment-list-pending-review/assessment-list-pending-review.component';
import { AssessmentReviewComponent } from './assessment-review/assessment-review.component';
import { UploadPhotoSingleComponent } from '../../core/components/upload-photo-single/upload-photo-single.component';





@NgModule({
  declarations: [
    AssessmentFormComponent,
    AssessmentListComponent,
    AssessmentSubmitComponent,
    AssessmentInfoComponent,
    AssessmentDetailComponent,
    AssessmentListPendingReviewComponent,
    AssessmentReviewComponent
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    FormsModule,
    NgbModalModule,
    SweetAlert2Module.forRoot(),
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    PhotoUploadComponent,
    UploadPhotoSingleComponent
  ]
})
export class AssessmentModule { }
