import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';


@NgModule({
  declarations: [



    PagetitleComponent,

  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [

    PagetitleComponent,


  ],
})
export class SharedModule { }
