import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { first } from 'rxjs';
import { AppVersion } from '../../models/error';


@Component({
  selector: 'app-app-version',
  templateUrl: './app-version.component.html',
  styles: [
  ]
})
export class AppVersionComponent implements OnInit {
  appVersion: AppVersion = {
    version: '0.0.0.0'
  };

  constructor(
    private configService: ConfigurationService
  ) {

  }
  ngOnInit(): void {
    this.configService.getAppVersion().pipe(first()).subscribe({
      next: (_) => {
        this.appVersion = _
        console.log("Version => ",_);
        
      }
    })

  }

}
