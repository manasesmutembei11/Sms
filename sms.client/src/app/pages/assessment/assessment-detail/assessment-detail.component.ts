import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from '../../../shared/services/message-box.service';

@Component({
  selector: 'app-assessment-detail',

  templateUrl: './assessment-detail.component.html',
})
export class AssessmentDetailComponent extends BaseComponent implements OnInit {
  id: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private messageBoxService: MessageBoxService,
  ) { super() }
  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      if (!this.id) {
        this.messageBoxService.toastWarning("Invalid assessment id")
        this.location.back();
      }
      this.pageTitle = 'Assessment Detail';
      this.breadCrumbItems = [
        { label: 'Operations' },
        { label: 'Assessment' },
        { label: this.pageTitle, active: true },
      ];


    });

  }
}
