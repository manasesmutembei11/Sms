import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tr } from 'date-fns/locale';
import { first } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base-component';
import { ReportGroupItemService } from '../../../shared/services/report-group-item.service';


@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls:['./report-viewer.component.scss']
})
export class ReportViewerComponent extends BaseComponent implements OnInit {
  uri: string = '';
  loading=false

  constructor(
    private route: ActivatedRoute,
    private service: ReportGroupItemService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      const id = params['id'] ? params['id'] : '';
      this.loadReportDetail(id);
    });
  }
  onLoad(event:any){
    this.loading=false;

  }
  loadReportDetail(id: any) {
    this.service
      .getReportConfiguration(id)
      .pipe(first())
      .subscribe((s) => {

        debugger;
        console.log(btoa("password"));
        this.pageTitle = s.name;
        this.breadCrumbItems = [
          { label: 'Reports' },
          { label: this.pageTitle, active: true },
        ];
        console.log("url encoded => ",s.reportInfo);
        this.loading=true;
        this.uri = `${s.reportViewerUri}/WebFormReportViewer.aspx?report=${s.reportInfo}`;
      });
  }
}


