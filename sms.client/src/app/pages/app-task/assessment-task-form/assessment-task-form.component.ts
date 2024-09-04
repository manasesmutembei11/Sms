import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../core/services/area.service';
import { Guid } from 'guid-typescript';
import { CustomValidators } from '../../../shared/custom-validators/custom-validators';
import { AssessmentTaskService } from '../../../core/services/assessment-task.service';
import { first } from 'rxjs';
import { LookupItem } from '../../../shared/models/responses/lookup-item';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientSelectorModalComponent } from '../../../core/components/client-selector-modal/client-selector-modal.component';
import { AccountService } from '../../../core/services/account.service';
import { AppTaskContact, AssessmentTask } from '../../../core/models/app-task.models';
import { cloneDeep } from 'lodash';
import { DpHelper } from '../../../shared/core/date-picker-helper';
import { AppTaskService } from '../../../core/services/app-task.service';
import { DocumentUploadType } from '../../../shared/models/uploads/document-upload-type';

@Component({
  selector: 'app-assessment-task-form',
  templateUrl: './assessment-task-form.component.html',
})
export class AssessmentTaskFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({}); 
  areas: LookupItem[] = [];
  accounts: LookupItem[] = [];
  minDate: NgbDateStruct
  maxDate: NgbDateStruct;
  handlers: LookupItem[] = [];
  contacts: AppTaskContact[] = [];
 
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private areaService: AreaService,
    private assessmentTaskService: AssessmentTaskService,
    private accountService: AccountService,
    private appTaskService: AppTaskService,
    private modalService: NgbModal,
    private location: Location
  ) {
    super()
    var date = new Date();
    this.minDate = { year: date.getFullYear() - 2, day: date.getDate(), month: date.getMonth() + 1 };
    this.maxDate = { year: date.getFullYear(), day: date.getDate(), month: date.getMonth() + 1 };
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
    this.loadLookupList();

  }
  loadLookupList() {
    this.areaService.lookupList().pipe(first()).subscribe({
      next: (_) => {
        this.areas = _
        if (_.length == 1) {
          this.form.patchValue({ areaId: _[0].id })
        }
      }
    })
    this.accountService.accountLookuplist().pipe(first()).subscribe({
      next: (_) => {
        this.accounts = _;
        if (_.length == 1) {
          this.form.patchValue({ accountId: _[0].id })
        }
      }
    })
    this.appTaskService.handlerLookuplist().pipe(first()).subscribe({
      next: (_) => {
        this.handlers = _;
        if (_.length == 1) {
          this.form.patchValue({ handlerId: _[0].id })
        }
      }
    })
  }

  override createForm(): FormGroup<any> {
    const f = this.fb.group({
      clientId: [null, Validators.required],
      clientName: [''],
      accountId: [null, Validators.required],
      areaId: [null, Validators.required],
      regDate: [null, Validators.required],
      regNumber: ['', Validators.required],
      handlerId: [null, Validators.required],
      customer: ['', Validators.required],
      remarks: ['', Validators.required],
      policyNumber: ['', Validators.required],
      claimNumber: ['', Validators.required],
      sumInsured: [null],
      garageName: ['', Validators.required],
      termsOfReference: ['', Validators.required],
      policyExcess: [null],
      contactPerson: ['', Validators.required],
      madatoryDocsUploaded: [null, [Validators.required, Validators.requiredTrue],],
      contacts: this.fb.array([]),
      id: [Guid.create().toString()],
    });
    return f;
  }
  loadContacts() {
    this.assessmentTaskService.contacts(this.form.value.id).pipe(first()).subscribe({
      next: (_) => {
        this.contacts = _
      }
    })


  }
  override initForm() {
    if (this.editMode) {
      this.assessmentTaskService.findById(this.id).pipe(first()).subscribe({
        next: (_) => {
          _.regDate = DpHelper.fromISO(_.regDate);
          this.form.patchValue(_);          
          this.loadContacts();
        }
      })
    } else {
      this.loadContacts();
    }

  }
  override back() {

  }

  selectClient() {
    var modalRef = this.modalService.open(ClientSelectorModalComponent, { backdrop: 'static', size: 'lg', });
    modalRef.componentInstance.title = "Client Selector"
    modalRef.componentInstance.accountType = 2
    modalRef.closed.subscribe({
      next: (_) => {       
        
        this.form.patchValue({ clientId: _.id,clientName:_.name })
      }
    })

  }
  onSubmit(action:string) {
    this.submitted = true;
    const isSubmit = action === "submit"    
    if (this.validateForm(this.form)) {
      const model: AssessmentTask = cloneDeep(this.form.value)
      console.log("Form =>",model);
      
      model.isSubmit=isSubmit;
      model.regDate = DpHelper.toISODate(model.regDate);      
      this.assessmentTaskService.save(model).subscribe({
        next: (_) => {
          //this.location.back();  
          this.router.navigate(["/ops-task/task/all"])     
         },
        error: (errors) => {
          this.errors = errors;
          console.log('Error =>', this.errors);
        },
      });
    }
  }
  updateDocuments(documents: DocumentUploadType[]) {
    let uploaded: boolean = true;
    if (documents && documents.filter((d) => d.mandatory && d.items.length === 0).length > 0) {
      uploaded = false;
    }
    this.form.patchValue({ madatoryDocsUploaded: uploaded });
  }
}

