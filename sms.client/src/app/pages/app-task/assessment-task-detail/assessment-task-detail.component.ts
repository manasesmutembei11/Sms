import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { AssessmentTaskService } from '../../../core/services/assessment-task.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';
import { first } from 'rxjs';
import { AssessmentTask } from '../../../core/models/app-task.models';

@Component({
  selector: 'app-assessment-task-detail',
  templateUrl: './assessment-task-detail.component.html',
})
export class AssessmentTaskDetailComponent extends BaseComponent implements OnInit {
  id: any;
  task!: AssessmentTask;

  constructor(
    private route: ActivatedRoute,
    private assessmentTaskService: AssessmentTaskService,
    private messageBoxService: MessageBoxService,
    private location: Location
  ) {
    super()

  }
  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      if (!this.id) {
        this.messageBoxService.toastWarning("Invalid assessment task id")
        this.location.back();
      }
      this.pageTitle = 'Assessment Task Detail';
      this.breadCrumbItems = [
        { label: 'Operations' },
        { label: 'Task' },
        { label: this.pageTitle, active: true },
      ];
      debugger
      this.assessmentTaskService.findById(this.id).pipe(first()).subscribe({
        next: (_) => this.task = _
      })
    });
  

  }
}
