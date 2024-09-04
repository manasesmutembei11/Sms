import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-component';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../../core/services/assessment.service';
import { MessageBoxService } from '../../../shared/services/message-box.service';
import { first } from 'rxjs';
import { SubmitAssessment } from '../../../core/models/assessment.models';


@Component({
  selector: 'app-assessment-submit',
  templateUrl: './assessment-submit.component.html',
})
export class AssessmentSubmitComponent extends BaseComponent implements OnInit {
  id: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private messageBoxService: MessageBoxService,
    private assessmentService: AssessmentService,
  ) { super() }
  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      if (!this.id) {
        this.messageBoxService.toastWarning("Invalid assessment id")
        this.location.back();
      }
      this.pageTitle = 'Confrim';
      this.breadCrumbItems = [
        { label: 'Operations' },
        { label: 'Assessment' },
        { label: this.pageTitle, active: true },
      ];


    });   

  }
  onSubmit(){
    var model:SubmitAssessment={id:this.id};
    this.assessmentService.submit(model).subscribe({
      next: (_) => {
        this.router.navigate(['/ops-asmt/assessment']);
      },
      error: (errors) => {
        this.errors = errors;
        console.log('Error =>', this.errors);
      },
    });
  }
}