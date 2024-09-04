import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { Assessment } from '../../../core/models/assessment.models';
import { AssessmentService } from '../../../core/services/assessment.service';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-assessment-list-pending-review',
  templateUrl: './assessment-list-pending-review.component.html',
})
export class AssessmentListPendingReviewComponent extends BasePagedListComponent implements OnInit {
  items: Assessment[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private authService: AuthService
  ) { super() }

  ngOnInit(): void {

    this.pageTitle = "Pending Review"
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
      }
    })
  }

  loadItems() {
    this.assessmentService.listPendingReview(this.page, this.pageSize, this.search)
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






}


