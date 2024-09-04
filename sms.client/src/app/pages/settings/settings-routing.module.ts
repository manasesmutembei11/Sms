import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ConfigOptionsComponent } from './config-options/config-options.component';
import { DocumentTemplateFormComponent } from './document-template-form/document-template-form.component';
import { DocumentTemplateListComponent } from './document-template-list/document-template-list.component';
import { ReportGroupFormComponent } from './report-group-form/report-group-form.component';
import { ReportGroupItemFormComponent } from './report-group-item-form/report-group-item-form.component';
import { ReportGroupItemListComponent } from './report-group-item-list/report-group-item-list.component';
import { ReportGroupComponent } from './report-group/report-group.component';
import { TestUploadComponent } from './test-upload/test-upload.component';
import { UploadConfigFormComponent } from './upload-config-form/upload-config-form.component';
import { UploadConfigListComponent } from './upload-config-list/upload-config-list.component';
import { UploadTypeFormComponent } from './upload-type-form/upload-type-form.component';
import { UploudTypeListComponent } from './uploud-type-list/uploud-type-list.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

import { NotificationFormComponent } from './notification-form/notification-form.component';
import { GroupContactListComponent } from './group-contact-list/group-contact-list.component';
import { GroupContactFormComponent } from './group-contact-form/group-contact-form.component';
import { AuthGuard } from '../../shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'reportgroup',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReportGroupComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'create', component: ReportGroupFormComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: ReportGroupFormComponent, canActivate: [AuthGuard] },
      {
        path: 'reports',
        canActivate: [AuthGuard],
        children: [
          { path: ':groupId', component: ReportGroupItemListComponent, canActivate: [AuthGuard] },
          { path: ':groupId/create', component: ReportGroupItemFormComponent, canActivate: [AuthGuard] },
          { path: ':groupId/edit/:id', component: ReportGroupItemFormComponent, canActivate: [AuthGuard] },
        ]
      }
    ]
  },
  {
    path: 'upload-type',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UploudTypeListComponent, pathMatch: 'full'},
      { path: 'create', component: UploadTypeFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: UploadTypeFormComponent},
    ]
  },
  {
    path: 'upload-config',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UploadConfigListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'create', component: UploadConfigFormComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: UploadConfigFormComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'config-options',
    canActivate: [AuthGuard],
    component: ConfigOptionsComponent, pathMatch: 'full',
  },
 
  {
    path: 'document-template',
    title:"Document Templates",
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DocumentTemplateListComponent, pathMatch: 'full', title:"Document Templates",},
      { path: 'create', component: DocumentTemplateFormComponent,pathMatch: 'full', title:"Create Document Template", },
      { path: 'edit/:id', component: DocumentTemplateFormComponent,  title:"Edit Document Template",},
    ]
  },
  
  { path: 'Upload', component: TestUploadComponent, pathMatch: 'full', title:"List",},
  
  {
    path: 'notification',   
    canActivate: [AuthGuard],
    children: [
      { path: '', component: NotificationListComponent, pathMatch: 'full'},
      { path: 'create', component: NotificationFormComponent,pathMatch: 'full',  },
      { path: 'edit/:id', component: NotificationFormComponent, },
    ]
  },
  {
    path: 'group-contact',   
    canActivate: [AuthGuard],
    children: [
      { path: '', component: GroupContactListComponent, pathMatch: 'full'},
      { path: 'create', component: GroupContactFormComponent,pathMatch: 'full',  },
      { path: 'edit/:id', component: GroupContactFormComponent, },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
