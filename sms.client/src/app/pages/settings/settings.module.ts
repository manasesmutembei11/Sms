import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingsRoutingModule } from './settings-routing.module';
import { ReportGroupComponent } from './report-group/report-group.component';

import {
  NgbDatepickerModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { ReportGroupFormComponent } from './report-group-form/report-group-form.component';
import { ReportGroupItemListComponent } from './report-group-item-list/report-group-item-list.component';
import { ReportGroupItemFormComponent } from './report-group-item-form/report-group-item-form.component';
import { UploudTypeListComponent } from './uploud-type-list/uploud-type-list.component';
import { UploadTypeFormComponent } from './upload-type-form/upload-type-form.component';
import { UploadConfigListComponent } from './upload-config-list/upload-config-list.component';
import { UploadConfigFormComponent } from './upload-config-form/upload-config-form.component';
import { UploadOperationItemComponent } from './upload-operation-item/upload-operation-item.component';
import { UploadOperationItemModalComponent } from './upload-operation-item-modal/upload-operation-item-modal.component';
import { ConfigOptionsComponent } from './config-options/config-options.component';
import { ConfigReportServerComponent } from './config-report-server/config-report-server.component';
import { ConfigStorageComponent } from './config-storage/config-storage.component';
import { TestUploadComponent } from './test-upload/test-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { DocumentTemplateListComponent } from './document-template-list/document-template-list.component';
import { DocumentTemplateFormComponent } from './document-template-form/document-template-form.component';

import { ConfigMailServerComponent } from './config-mail-server/config-mail-server.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { GroupContactListComponent } from './group-contact-list/group-contact-list.component';
import { GroupContactFormComponent } from './group-contact-form/group-contact-form.component';
import { ConfigThirdPartyClaimComponent } from './config-third-party-claim/config-third-party-claim.component';
import { ConfigExpaqMateServerComponent } from './config-expaq-mate-server/config-expaq-mate-server.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ReportGroupComponent,
    ReportGroupFormComponent,
    ReportGroupItemListComponent,
    ReportGroupItemFormComponent,
    UploudTypeListComponent,
    UploadTypeFormComponent,
    UploadConfigListComponent,
    UploadConfigFormComponent,
    UploadOperationItemComponent,
    UploadOperationItemModalComponent,
    ConfigOptionsComponent,
    ConfigReportServerComponent,
    ConfigStorageComponent,

    TestUploadComponent,
    DocumentTemplateListComponent,
    DocumentTemplateFormComponent,

    ConfigMailServerComponent,    
    NotificationListComponent,
    NotificationFormComponent,
    GroupContactListComponent,
    GroupContactFormComponent,
    ConfigThirdPartyClaimComponent,
    ConfigExpaqMateServerComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    NgbModalModule,
    NgbDatepickerModule,
    FormsModule,
    FileUploadModule,
  ],
})
export class SettingsModule { }
