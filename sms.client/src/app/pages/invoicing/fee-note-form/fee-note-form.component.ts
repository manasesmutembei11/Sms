import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { FeeNoteService } from '../../../core/services/fee-note.service';
import { first } from 'rxjs';
import { FeeNote, FeeNoteItem } from '../../../core/models/fee-note.models';
import { cloneDeep } from 'lodash';
import { MessageBoxService } from '../../../shared/services/message-box.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeeNoteItemFormModalComponent } from '../fee-note-item-form-modal/fee-note-item-form-modal.component';
import { DocumentUploadType } from '../../../shared/models/uploads/document-upload-type';

@Component({
  selector: 'app-fee-note-form',
  templateUrl: './fee-note-form.component.html',
})
export class FeeNoteFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  taskId: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,   
    private feeNoteService: FeeNoteService,
    private messageBoxService:MessageBoxService,
    private modalService: NgbModal,
  ) {
    super()
  }
  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.taskId = params['taskId'] ? params['taskId'] : '';
      this.form.patchValue({ appTaskId: this.taskId })
      this.editMode = params['id'] != null;
      this.updatePageUI(); 
      this.initForm();
    });
  }
  private updatePageUI() {
    this.pageTitle = this.editMode ? 'Edit Fee Note' : 'New Fee Note';
    this.breadCrumbItems = [
      { label: 'Operations' },
      { label: 'Invoicing' },
      { label: this.pageTitle, active: true },
    ];
    this.buttonText = this.editMode ? 'Update' : 'Create';
  }

  createForm(): FormGroup {
    const f = this.fb.group({
      feeNoteType: ['', [Validators.required]],
      feeNoteTypeName: [''],
      clientName: [''],
      clientId: ['', [Validators.required]],
      accountName: [''],
      accountId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      appTaskId: ['', [Validators.required]],      
      id: [Guid.create().toString()],
      items: this.fb.array([]),
      madatoryDocsUploaded: [false]
    });
    return f;
  }
  
  initForm() {
    if (this.editMode) {
      this.feeNoteService.findById(this.id).pipe(first()).subscribe({
        next:(_)=>{
          this.form.patchValue(_);          
        }
      });
    }else{
      this.feeNoteService.findByTaskId(this.taskId).pipe(first()).subscribe({
        next:(_)=>{
          this.form.patchValue(_);
          this.editMode=_.editMode        
          this.updatePageUI()
          if(_.items){
            _.items.forEach(f=>this.createFeeNoteItemForm(f))
          }

        }
      });
    }
  }
  override back() {
    this.location.back()
  }
  override onCancel(): void {
    //this.router.navigate(['/']);
    this.location.back();
  }
  addFeeNoteItem() {
    var modalRef = this.modalService.open(FeeNoteItemFormModalComponent, { backdrop: 'static', size: 'lg', });
    modalRef.componentInstance.title = "Add Fee Note Item"
    modalRef.componentInstance.modelId = this.form.value.modelId;
    modalRef.closed.subscribe({
      next: (_: FeeNoteItem) => {
        var part: FeeNoteItem = {
          ..._,
          feeNoteId: this.form.value.id,          
        }
        this.createFeeNoteItemForm(part)
        this.validate()
      }
    })

  }
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
  createFeeNoteItemForm(item: FeeNoteItem) {
    const f = this.fb.group({
      id: [''],
      feeNoteId: [this.form.value.id],
      chargeId: ['',Validators.required],
      chargeName: [''],
      description: [''],     
      quantity: [0],
      amount: [0],
      taxAmount: [0],
      taxRate: [0],
      total: [0], 
    });
    f.patchValue(item);
    this.items.push(f)

  }

  editItem(index: number) {  
    this.validate()
  }
  removeItem(index: number) {
    this.items.removeAt(index);
    this.validate()
  }
  validate() {
   
  }
  onSubmit(action: string){
    const isSubmit = action === "submit"
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: FeeNote = cloneDeep(this.form.value)
      model.isSubmit=isSubmit;
      this.feeNoteService.save(model).subscribe({
        next: (_) => {
          this.messageBoxService.toastSuccess("Fee note save successfully")
          if(isSubmit){
            this.location.back()
          }
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
