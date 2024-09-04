import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base-component';
import { EnumLookupItem } from '../../../shared/models/responses/lookup-item';
import { ConfigurationService } from '../../../shared/services/configuration.service';


@Component({
  selector: 'app-config-options',
  templateUrl: './config-options.component.html',
  styleUrls: ['./config-options.component.scss']
})
export class ConfigOptionsComponent extends BaseComponent implements OnInit {
  configTypes:EnumLookupItem[]=[];
  selectedItem: EnumLookupItem | undefined;

  constructor(private configService: ConfigurationService) { super()}

  ngOnInit(): void {
    this.pageTitle="Items"

    this.breadCrumbItems=[
      {label:"Setting"},
      {label:"Configuration Options"},
      {label:this.pageTitle,active:true}
    ]
    this.loadConfigTypes();
  }
  loadConfigTypes() {
    this.configService.getConfigTypes()
    .pipe(first())
    .subscribe(data => {
      this.configTypes = data;

    });

  }
  selectConfigType(item:EnumLookupItem){
    this.selectedItem=item
  }

}
