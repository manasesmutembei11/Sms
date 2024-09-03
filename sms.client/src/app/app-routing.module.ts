import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
