import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';



const routes: Routes = [
  { path: 'masterdata', loadChildren: () => import('./masterdata/masterdata.module').then(m => m.MasterdataModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
