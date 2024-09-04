import { Component, OnInit } from '@angular/core';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { SurveyItem } from '../../../core/models/master-data.models';
import { SurveyItemService } from '../../../core/services/survey-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MessageBoxService } from '../../../shared/services/message-box.service';
import { result } from 'lodash';

@Component({
  selector: 'app-survey-item-list',
  templateUrl: './survey-item-list.component.html',
  styles: []
})
export class SurveyItemListComponent extends BasePagedListComponent implements OnInit{
  items: SurveyItem[] = [];

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private surveyItemService: SurveyItemService,
    private messageBox: MessageBoxService
  ) { super() }

  ngOnInit(): void {
    
    this.pageTitle = "List"
    this.breadCrumbItems = [
      { label: "Master Data" },
      { label: "Survey Item" },
      { label: this.pageTitle, active: true }
    ]
    this.route.queryParams.pipe(first()).subscribe({next:(_) => this.fetchPagingParams(_)});
    this.loadItems()
  }
 
 

  loadItems() {
    this.surveyItemService.list(this.page, this.pageSize, this.search)
      .pipe(first())
      .subscribe({
        next: (_) => {
          this.items = _.data;
          this.totalCount = _.metaData.totalCount;
        }
      });
    const params = {
      page: this.page,
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge' });

  }
  deleteItem(id: string) {
    this.messageBox.confirm("Are you sure you want to delete this item?")
    .then((result) => {
      if(result.isConfirmed){
        this.surveyItemService.delete(id).pipe(first()).subscribe({
          next: () => {
            this.loadItems()
          }
        });
      }
    })
  }
}
