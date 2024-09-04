import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaListComponent } from './area-list/area-list.component';
import { AreaFormComponent } from './area-form/area-form.component';

import { TaxListComponent } from './tax-list/tax-list.component';
import { TaxFormComponent } from './tax-form/tax-form.component';
import { ChargeListComponent } from './charge-list/charge-list.component';
import { ChargeFormComponent } from './charge-form/charge-form.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { VehicleMakeListComponent } from './vehicle-make-list/vehicle-make-list.component';
import { VehicleMakeFormComponent } from './vehicle-make-form/vehicle-make-form.component';
import { VehicleModelListComponent } from './vehicle-model-list/vehicle-model-list.component';
import { VehicleModelFormComponent } from './vehicle-model-form/vehicle-model-form.component';
import { VehicleCategoryListComponent } from './vehicle-category-list/vehicle-category-list.component';
import { VehicleCategoryFormComponent } from './vehicle-category-form/vehicle-category-form.component';
import { VehicleColorListComponent } from './vehicle-color-list/vehicle-color-list.component';
import { VehicleColorFormComponent } from './vehicle-color-form/vehicle-color-form.component';
import { PartCategoryListComponent } from './part-category-list/part-category-list.component';
import { PartCategoryFormComponent } from './part-category-form/part-category-form.component';
import { PartConditionListComponent } from './part-condition-list/part-condition-list.component';
import { PartConditionFormComponent } from './part-condition-form/part-condition-form.component';
import { PartListComponent } from './part-list/part-list.component';
import { PartFormComponent } from './part-form/part-form.component';
import { ClientAccountListComponent } from './client-account-list/client-account-list.component';
import { ClientAccountFormComponent } from './client-account-form/client-account-form.component';
import { AssessorAccountListComponent } from './assessor-account-list/assessor-account-list.component';
import { AssessorAccountFormComponent } from './assessor-account-form/assessor-account-form.component';
import { AccountLetterHeadComponent } from './account-letter-head/account-letter-head.component';
import { VehicleModelPartListComponent } from './vehicle-model-part-list/vehicle-model-part-list.component';
import { VehicleModelPartFormComponent } from './vehicle-model-part-form/vehicle-model-part-form.component';
import { VehicleModelPartImportComponent } from './vehicle-model-part-import/vehicle-model-part-import.component';
import { SurveyItemListComponent } from './survey-item-list/survey-item-list.component';
import { SurveyItemFormComponent } from './survey-item-form/survey-item-form.component';
import { VehiclePartTemplateImportComponent } from './vehicle-part-template-import/vehicle-part-template-import.component';


const routes: Routes = [  
 
  {
    path: 'area',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AreaListComponent, pathMatch: 'full',},
      { path: 'create', component: AreaFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: AreaFormComponent},
    ]
  },
  
  {
    path: 'tax',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TaxListComponent, pathMatch: 'full',},
      { path: 'create', component: TaxFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: TaxFormComponent},
    ]
  },
  {
    path: 'charge',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ChargeListComponent, pathMatch: 'full',},
      { path: 'create', component: ChargeFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: ChargeFormComponent},
    ]
  },
  {
    path: 'vehicle-make',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: VehicleMakeListComponent, pathMatch: 'full',},
      { path: 'create', component: VehicleMakeFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: VehicleMakeFormComponent},
      {
        path: 'model',
        canActivate: [AuthGuard],
        children: [
          { path: ':makeId', component: VehicleModelListComponent, pathMatch: 'full',  },
          { path: ':makeId/create', component: VehicleModelFormComponent, pathMatch: 'full' },
          { path: ':makeId/edit/:id', component: VehicleModelFormComponent, },
        ]
      },
    ]
  },
  
  {
    path: 'vehicle-category',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: VehicleCategoryListComponent, pathMatch: 'full',},
      { path: 'create', component: VehicleCategoryFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: VehicleCategoryFormComponent},
    ]
  },
  {
    path: 'vehicle-color',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: VehicleColorListComponent, pathMatch: 'full',},
      { path: 'create', component: VehicleColorFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: VehicleColorFormComponent},
    ]
  },

  {
    path: 'part-category',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PartCategoryListComponent, pathMatch: 'full',},
      { path: 'create', component: PartCategoryFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: PartCategoryFormComponent},
    ]
  },

  
  {
    path: 'part-condition',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PartConditionListComponent, pathMatch: 'full',},
      { path: 'create', component: PartConditionFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: PartConditionFormComponent},
    ]
  },
  {
    path: 'part',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PartListComponent, pathMatch: 'full',},      
      { path: 'edit/:id', component: PartFormComponent},
    ]
  },
  {
    path: 'vehicle-model-part',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: VehicleModelPartListComponent, pathMatch: 'full',},
      { path: ':modelId/create', component: VehicleModelPartFormComponent,pathMatch: 'full' },
      { path: ':modelId/edit/:id', component: VehicleModelPartFormComponent},
      { path: ':modelId/import', component: VehicleModelPartImportComponent},
    ]
  },
  { path: 'add-part', component: VehicleModelPartFormComponent},
  {
    path: 'client',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ClientAccountListComponent, pathMatch: 'full',},
      { path: 'create', component: ClientAccountFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: ClientAccountFormComponent},
    ]
  },

  {
    path: 'asessor',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AssessorAccountListComponent, pathMatch: 'full',},
      { path: 'create', component: AssessorAccountFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: AssessorAccountFormComponent},
      { path: 'letter-head/:accountId', component: AccountLetterHeadComponent, },
    ]
  },
  {
    path: 'survey-item',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SurveyItemListComponent, pathMatch: 'full',},
      { path: 'create', component: SurveyItemFormComponent,pathMatch: 'full' },
      { path: 'edit/:id', component: SurveyItemFormComponent},
    ]
  },
  { path: 'import-part-template', component: VehiclePartTemplateImportComponent, pathMatch: 'full',}
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterdataRoutingModule { }
