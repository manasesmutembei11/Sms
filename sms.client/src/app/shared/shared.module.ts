import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { ValidityStyleDirective } from './directives/validity-style.directive';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';


@NgModule({
  declarations: [


    ValidityStyleDirective,
    PagetitleComponent,
    ErrorDisplayComponent,
    PagetitleComponent,
    ErrorDisplayComponent,
    ValidityStyleDirective


  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    PagetitleComponent,
    ErrorDisplayComponent,
    ValidityStyleDirective


  ],
})
export class SharedModule { }
