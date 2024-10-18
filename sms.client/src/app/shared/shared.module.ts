import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { ValidityStyleDirective } from './directives/validity-style.directive';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { MasterdataModule } from '../masterdata/masterdata.module';


@NgModule({
  declarations: [


    ValidityStyleDirective,
    PagetitleComponent,
    ErrorDisplayComponent

  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MasterdataModule],
  exports: [


  ],
})
export class SharedModule { }
