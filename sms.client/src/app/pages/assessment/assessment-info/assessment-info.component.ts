import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Assessment } from '../../../core/models/assessment.models';
import { AssessmentService } from '../../../core/services/assessment.service';
import { BaseComponent } from '../../../shared/components/base-component';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-assessment-info',
 
  templateUrl: './assessment-info.component.html',
})
export class AssessmentInfoComponent extends BaseComponent implements OnInit {
  @Input() id: string = '';
  assessment!: Assessment;
  constructor(       
    private assessmentService: AssessmentService,
   
  ) { super() }
  ngOnInit(): void {
   
    this.assessmentService.findById(this.id).pipe(first()).subscribe({
      next: (_) => this.assessment = _
    })

  }
}