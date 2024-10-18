import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { NgxErrorsFormDirective } from '@ngspot/ngx-errors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbPaginationModule, SharedModule, NgxErrorsFormDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sms.client';
}
