import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../../shared/shared.module';
import { AppTaskRoutingModule } from './app-task-routing.module';
import { AppTaskListComponent } from './app-task-list/app-task-list.component';
import { AppTaskFormComponent } from './app-task-form/app-task-form.component';
import { AssessmentTaskFormComponent } from './assessment-task-form/assessment-task-form.component';
import { ReinspectionTaskFormComponent } from './reinspection-task-form/reinspection-task-form.component';
import { TaskContactFormComponent } from "../../core/components/task-contact-form/task-contact-form.component";
import { AppTaskListAllComponent } from './app-task-list-all/app-task-list-all.component';
import { AssessmentTaskDetailComponent } from './assessment-task-detail/assessment-task-detail.component';




@NgModule({
    declarations: [
        AppTaskListComponent,
        AppTaskFormComponent,
        AssessmentTaskFormComponent,
        ReinspectionTaskFormComponent,
        AppTaskListAllComponent,
        AssessmentTaskDetailComponent
        
    ],
    imports: [
        CommonModule,
        AppTaskRoutingModule,
        SharedModule,
        NgbPaginationModule,
        ReactiveFormsModule,
        NgxErrorsModule,
        FormsModule,
        NgbModalModule,
        SweetAlert2Module.forRoot(),
        NgbDatepickerModule,
        NgbDropdownModule,
        TaskContactFormComponent
    ],
 
})
export class AppTaskModule { }
