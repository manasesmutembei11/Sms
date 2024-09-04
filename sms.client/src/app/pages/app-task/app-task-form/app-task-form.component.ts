import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-component';
import { AppTask, AppTaskFormAction } from '../../../core/models/app-task.models';
import { AppTaskService } from '../../../core/services/app-task.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';


@Component({
  selector: 'app-app-task-form',
  templateUrl: './app-task-form.component.html',
})
export class AppTaskFormComponent extends BaseComponent implements OnInit {
  id: any;
  action: AppTaskFormAction = { taskTypes: [] };
  selectedActionId!: number | any
  task!: AppTask;
  editMode: boolean = false;

  constructor(
    private appTaskService: AppTaskService,
    private route: ActivatedRoute,
    private location: Location  
  ) {
    super();
  }
  ngOnInit(): void {

    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Task' : 'New Task';
      this.breadCrumbItems = [
        { label: "Operations" },
        { label: "Task" },
        { label: this.pageTitle, active: true }
      ]
      this.appTaskService.getFormAction(this.id).pipe(first()).subscribe({
        next: (_) => {
          this.selectedActionId = _.selectedTaskTypeId
          this.action = _
        },
        error: (_) => this.errors = _
      })



    });






  }

  

  back() {
    this.location.back()
  }
  done(close: boolean | any) {
    if (close) {
      this.location.back()
    }
  }
}

