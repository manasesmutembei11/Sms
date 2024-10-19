import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), },

];
