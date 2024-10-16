import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../shared/components/base-paged-list-component';
import { Department } from '../../core/models/department.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DepartmentService } from '../../core/services/department.service';
import { MessageBoxService } from '../../shared/services/message-box.service';
import { first } from 'rxjs';
import { PagetitleComponent } from '../../shared/components/pagetitle/pagetitle.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent extends BasePagedListComponent implements OnInit {
  items: Department[] = [];
  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Department" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({ next: (_) => this.fetchPagingParams(_) });
    this.loadItems()
  }
  loadItems() {
    this.departmentService.list(this.page, this.pageSize, this.search)
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
  deleteItem(id: string) {
    this.messageBox.confirm("Are you sure you want to delete this department?")
      .then((result) => {
        if (result.isConfirmed) {
          this.departmentService.delete(id).pipe(first()).subscribe({
            next: () => {
              this.loadItems()
            }
          });
        }
      })
  }

}
