import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterdataRoutingModule } from './masterdata-routing.module';

import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaFormComponent } from './area-form/area-form.component';

import { TaxListComponent } from './tax-list/tax-list.component';
import { ChargeListComponent } from './charge-list/charge-list.component';
import { TaxFormComponent } from './tax-form/tax-form.component';
import { ChargeFormComponent } from './charge-form/charge-form.component';
import { SharedModule } from '../../shared/shared.module';
import { VehicleMakeFormComponent } from './vehicle-make-form/vehicle-make-form.component';
import { VehicleMakeListComponent } from './vehicle-make-list/vehicle-make-list.component';
import { VehicleModelListComponent } from './vehicle-model-list/vehicle-model-list.component';
import { VehicleModelFormComponent } from './vehicle-model-form/vehicle-model-form.component';
import { VehicleCategoryListComponent } from './vehicle-category-list/vehicle-category-list.component';
import { VehicleCategoryFormComponent } from './vehicle-category-form/vehicle-category-form.component';
import { VehicleColorListComponent } from './vehicle-color-list/vehicle-color-list.component';
import { VehicleColorFormComponent } from './vehicle-color-form/vehicle-color-form.component';
import { PartCategoryFormComponent } from './part-category-form/part-category-form.component';
import { PartCategoryListComponent } from './part-category-list/part-category-list.component';
import { PartConditionListComponent } from './part-condition-list/part-condition-list.component';
import { PartConditionFormComponent } from './part-condition-form/part-condition-form.component';
import { PartFormComponent } from './part-form/part-form.component';
import { PartListComponent } from './part-list/part-list.component';
import { ClientAccountListComponent } from './client-account-list/client-account-list.component';
import { ClientAccountFormComponent } from './client-account-form/client-account-form.component';
import { AssessorAccountFormComponent } from './assessor-account-form/assessor-account-form.component';
import { AssessorAccountListComponent } from './assessor-account-list/assessor-account-list.component';
import { AccountLetterHeadComponent } from './account-letter-head/account-letter-head.component';
import { VehicleModelPartListComponent } from './vehicle-model-part-list/vehicle-model-part-list.component';
import { VehicleModelPartImportComponent } from './vehicle-model-part-import/vehicle-model-part-import.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SurveyItemListComponent } from './survey-item-list/survey-item-list.component';
import { SurveyItemFormComponent } from './survey-item-form/survey-item-form.component';
import { VehicleModelPartFormComponent } from './vehicle-model-part-form/vehicle-model-part-form.component';
import { VehiclePartTemplateImportComponent } from './vehicle-part-template-import/vehicle-part-template-import.component';



@NgModule({
  declarations: [
    
    AreaListComponent, 
    AreaFormComponent,    
    TaxListComponent,
    ChargeListComponent,
    TaxFormComponent,
    ChargeFormComponent,
    VehicleMakeFormComponent,
    VehicleMakeListComponent,
    VehicleModelListComponent,
    VehicleModelFormComponent,
    VehicleCategoryListComponent,
    VehicleCategoryFormComponent,
    VehicleColorListComponent,
    VehicleColorFormComponent,
    PartCategoryFormComponent,
    PartCategoryListComponent,
    PartConditionListComponent,
    PartConditionFormComponent,
    PartFormComponent,
    PartListComponent,
    ClientAccountListComponent,
    ClientAccountFormComponent,
    AssessorAccountFormComponent,
    AssessorAccountListComponent,
    AccountLetterHeadComponent,
    VehicleModelPartListComponent,
    VehicleModelPartImportComponent,
    SurveyItemListComponent,
    SurveyItemFormComponent,
    VehicleModelPartFormComponent,
    VehiclePartTemplateImportComponent
  ],
  imports: [
    CommonModule,
    MasterdataRoutingModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    FormsModule,
    NgbModalModule,
    SweetAlert2Module.forRoot(),
    FileUploadModule

  ]
})
export class MasterdataModule { }
