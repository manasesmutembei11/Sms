import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { Charge, Tax } from '../../../core/models/master-data.models';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TaxService } from '../../../core/services/tax.service';
import { ChargeService } from '../../../core/services/charge.service';
import { first } from 'rxjs';
import { Guid } from 'guid-typescript';
import { FeeNoteItem } from '../../../core/models/fee-note.models';
import { cloneDeep } from 'lodash';
import { ParserUtil } from '../../../shared/core/parse-helper';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-fee-note-item-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    NgbModalModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxErrorsModule
  ],
  templateUrl: './fee-note-item-form-modal.component.html',
})
export class FeeNoteItemFormModalComponent extends BaseFormComponent implements OnInit {
  taxes: Tax[] = [];
  charges: Charge[] = [];
  @ViewChild('formDirective') formDirective!: NgForm;
  title: string = "Add Fee Note Item"
  form: FormGroup = this.fb.group({});
  quantityNumericOption = { minimumValue: '0', maximumValue: '999.99', decimalPlaces: 0 }
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private taxService: TaxService,
    private chargeService: ChargeService,

  ) {
    super()
  }

  ngOnInit(): void {
    this.form = this.createForm()
    this.buttonText = "Add or Update"
    this.loadLookupList()
  }
  loadLookupList() {
    this.taxService.lookupList().pipe(first()).subscribe({
      next: (_) => this.taxes = _
    })
    this.chargeService.lookupList(2).pipe(first()).subscribe({
      next: (_) => this.charges = _
    })
  }

  override createForm(): FormGroup<any> {
    const f = this.fb.group({      
      feeNoteId: [this.form.value.id],
      chargeId: [null,Validators.required],
      chargeName: [''],
      description: ['',Validators.required],     
      quantity: [1,Validators.required],
      amount: [0,Validators.required],
      taxAmount: [0,Validators.required],
      taxRate: [0],
      total: [0], 
      taxCode: [null,Validators.required], 
      requireDescription:[false],
      id: [Guid.create().toString()],
    });
    return f;
  }
  onChargeChange() {
    var charge = this.charges.find(s => s.id == this.form.value.chargeId)
    if (charge?.requireDescription) {
      this.form.controls['description'].setValidators([Validators.required]);
    } else {
      this.form.controls['description'].clearValidators()
    }
    this.form.controls['description'].updateValueAndValidity()
    this.compute();
  }
  compute() {

    const model: FeeNoteItem = cloneDeep(this.form.value);
    var charge = this.charges.find(s => s.id == model.chargeId)
    const tax = this.taxes.find(s => s.code === model.taxCode);
    const amount = ParserUtil.toDecimal(model.amount ?? 0);
    const quantity = ParserUtil.toDecimal(model.quantity ?? 0);
    if (charge) {
      model.chargeName = charge.name
      let vatRate = 0
      if (tax) { vatRate = tax.rate; }
      model.taxAmount = amount * vatRate * quantity;
      model.total = quantity * amount + model.taxAmount;
      model.requireDescription = charge.requireDescription
      this.form.patchValue(model)
    }
    console.log("compute => ", model);
  }
  onSubmit() {
    this.submitted = true;
    if (this.validateForm(this.form)) {
      const model: FeeNoteItem = cloneDeep(this.form.value)
      this.activeModal.close(model);
    }
  }
  override initForm() {

  }
  override back() {

  }
}

