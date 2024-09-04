import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Assessment } from '../../../core/models/assessment.models';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppTaskService } from '../../../core/services/app-task.service';
import { first } from 'rxjs';
import { AssessmentService } from '../../../core/services/assessment.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
})
export class AssessmentListComponent extends BasePagedListComponent implements OnInit {
  items: Assessment[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private authService: AuthService
  ) { super() }

  ngOnInit(): void {

    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Operations" },
      { label: "Assessment" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({ next: (_) => this.fetchPagingParams(_) });
    this.loadItems()

    

    this.authService.currentUser.pipe(first()).subscribe({
      next: (_) => {
        this.userId = _.id
        console.log("User Id => ",this.userId);        
      }
    })
  }

  loadItems() {
    this.assessmentService.list(this.page, this.pageSize, this.search)
      .pipe(first())
      .subscribe({
        next: (_) => {
          this.items = _.data;
          this.totalCount = _.metaData.totalCount;
        }
      });
    const params: Params = {
      page: this.page,
    }
    this.router.navigate(["."], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge' });

  }

  printPreview(id: string) {
    this.assessmentService.printPreview(id).pipe(first()).subscribe({
      next: (_: any) => {
        if (_.body) {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob([_.body], { type: _.body.type }));
          const contentDisposition = _.headers.get('content-disposition');
          const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
          downloadLink.download = fileName.replaceAll('"', '');
          downloadLink.click();
        }
      }
    })
  }
  combinedPrintPreview(id: string) {
    this.assessmentService.combinedPrintPreview(id).pipe(first()).subscribe({
      next: (_: any) => {
        if (_.body) {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob([_.body], { type: _.body.type }));
          const contentDisposition = _.headers.get('content-disposition');
          const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
          downloadLink.download = fileName.replaceAll('"', '');
          downloadLink.click();
        }
      }
    })
  }



}

