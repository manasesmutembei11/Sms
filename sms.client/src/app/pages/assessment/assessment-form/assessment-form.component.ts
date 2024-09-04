import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, model } from '@angular/core';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumLookupItem, LookupItem } from '../../../shared/models/responses/lookup-item';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AssessmentService } from '../../../core/services/assessment.service';
import { first } from 'rxjs';
import { Assessment, AssessmentItem, AssessmentOtherCost, AssessmentSurveyItem } from '../../../core/models/assessment.models';
import { cloneDeep } from 'lodash';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModelSelectorModalComponent } from '../../../core/components/vehicle-model-selector-modal/vehicle-model-selector-modal.component';
import { EnumLookupService } from '../../../shared/services/enum-lookup.service';
import { VehicleColorService } from '../../../core/services/vehicle-color.service';
import { DpHelper } from '../../../shared/core/date-picker-helper';
import { AddUpdatePartModalComponent } from '../../../core/components/add-update-part-modal/add-update-part-modal.component';
import { ComputationServiceItem, PartComputationItem } from '../../../core/models/computation.models';
import { AddUpdateServiceModalComponent } from '../../../core/components/add-update-service-modal/add-update-service-modal.component';
import { SurveyItemService } from '../../../core/services/survey-item.service';
import { DocumentUploadType } from '../../../shared/models/uploads/document-upload-type';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
})
export class AssessmentFormComponent extends BaseFormComponent implements OnInit {
  active = 1;
  form: FormGroup = this.fb.group({});
  years: EnumLookupItem[] = [];
  colours: LookupItem[] = [];
  odometerItems: LookupItem[] = [
    { code: "KM", name: "KM", id: '' },
    { code: "MILE", name: "MILE", id: '' }
  ];
  repairTimelineOption = { minimumValue: '0', maximumValue: '999.99', decimalPlaces: 0 }
  percentOption = { minimumValue: '0', maximumValue: '100', decimalPlaces: 2 }
  minDate: NgbDateStruct
  maxDate: NgbDateStruct;
  taskId: string = '';
  recommedations: EnumLookupItem[] = [];
  surveyValues: EnumLookupItem[]=[];
  transmissionTypes: EnumLookupItem[]=[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public location: Location,
    public assessmentService: AssessmentService,
    private modalService: NgbModal,
    private enumLookupService: EnumLookupService,
    private vehicleColorService: VehicleColorService,
    private surveyItemService: SurveyItemService
  ) {
    super();
    var date = new Date();
    this.minDate = { year: date.getFullYear() - 1, day: date.getDate(), month: date.getMonth() + 1 };
    this.maxDate = { year: date.getFullYear(), day: date.getDate(), month: date.getMonth() + 1 };
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.route.params.pipe().subscribe((params) => {
      this.id = params['id'] ? params['id'] : '';
      this.taskId = params['taskId'] ? params['taskId'] : '';
      this.form.patchValue({ taskId: this.taskId })

      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Assessment' : 'New Assessment';
      this.breadCrumbItems = [
        { label: 'Operations' },
        { label: 'Assessment' },
        { label: this.pageTitle, active: true },
      ];
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
    this.enumLookupService.yearList().pipe(first()).subscribe({
      next: (_) => {
        this.years = _
      }
    })
    this.vehicleColorService.lookupList().pipe(first()).subscribe({
      next: (_) => {
        this.colours = _
      }
    })
    this.enumLookupService.assessmentRecommendationList().pipe(first()).subscribe({
      next: (_) => {
        this.recommedations = _
      }
    })
    this.enumLookupService.assessmentSurveyItemValueList().pipe(first()).subscribe({
      next: (_) => {
        this.surveyValues = _
      }
    });
    this.enumLookupService.transmissionTypeList().pipe(first()).subscribe({
      next: (_) => {
        this.transmissionTypes = _
      }
    })
  }
  createForm(): FormGroup {
    const f = this.fb.group({
      taskId: ['', [Validators.required]],
      assessmentDate: ['', [Validators.required]],
      yom: [null, [Validators.required]],
      modelId: [null, [Validators.required]],
      modelName: ['', []],
      odometer: [''],
      odometerUOM: ['KM'],
      color: [null, Validators.required],
      chassisNo: ['', Validators.required],
      engineNo: ['', Validators.required],
      salvageValue: [null,],
      requireInvestigation: [false],
      preAccidentValue: ['', Validators.required],
      repairTimeline: ['', Validators.required],
      recommendation: [null, Validators.required],
      assessmentType: ['1', Validators.required],
      parentId: [null],
      remarks: ['', Validators.required],
      damageProfile: ['', Validators.required],
      profferedRepairMethod: ['', Validators.required],
      nsf: ['', Validators.required],
      nsr: ['', Validators.required],
      osf: ['', Validators.required],
      osr: ['', Validators.required],
      tireSize: ['', Validators.required],
      tireBrand: ['', Validators.required],
      transmissionType: [null, Validators.required],
      placeOfOrigin: ['', Validators.required],
      regDate: [''],
      termsOfReference: ['', Validators.required],
      vehicleDetailComment: ['', Validators.required],
      items: this.fb.array([]),
      otherCosts: this.fb.array([]),
      surveyItems: this.fb.array([]),
      id: [Guid.create().toString()],
      photoUpload: [false],
      repairItemInputed: [false],
      madatoryDocsUploaded: [false]
    });
    return f;
  }
  initForm() {
    if (this.editMode) {
      this.assessmentService.findById(this.id).pipe(first()).subscribe({
        next: (_) => {
          _.assessmentDate = DpHelper.fromISO(_.assessmentDate);
          _.regDate = DpHelper.fromISO(_.regDate);
          this.form.patchValue(_);
          if (_.items) {
            _.items.forEach(f => this.createPartForm(f))
          }
          if (_.otherCosts) {
            _.otherCosts.forEach(f => this.createOtherCostForm(f))
          }
          if (_.surveyItems) {
            _.surveyItems.forEach(f => this.createSurveyItemsForm(f))
          }      
          this.validate();
        }
      })
    }else{
      this.surveyItemService.lookupList(1).pipe(first()).subscribe({
        next: (_) => {
           _.forEach(f=>{
            var item:AssessmentSurveyItem={
              assessmentId: this.form.value.id,
              id: Guid.create().toString(),
              itemId: f.id,
              itemName: f.name,
              value: '',
              valueName: ''
            };
            this.createSurveyItemsForm(item)
           })
        }
      })
    }
  }
  onSubmit(action: string) {
    this.submitted = true;
    const isDone = action === "done"
    this.updateUploadValidators(isDone);
    if (this.validateForm(this.form)) {
      const model: Assessment = cloneDeep(this.form.value)
      model.assessmentDate = DpHelper.toISODate(model.assessmentDate);
      if(model.regDate){
        model.regDate = DpHelper.toISODate(model.regDate);
      }
      model.isDone = isDone     
      this.assessmentService.save(model).subscribe({
        next: (_) => {
          this.router.navigate(['/ops-asmt/assessment']);
        },
        error: (errors) => {
          this.errors = errors;        
        },
      });
    }
  }

  updateUploadValidators(isSubmit: boolean) {
    if (isSubmit) {
      this.form.controls["photoUpload"].setValidators([Validators.required, Validators.requiredTrue])
      this.form.controls["repairItemInputed"].setValidators([Validators.required, Validators.requiredTrue])
    } else {
      this.form.controls["photoUpload"].clearValidators()
      this.form.controls["repairItemInputed"].clearValidators()
    }
    this.form.controls['photoUpload'].updateValueAndValidity()
    this.form.controls['repairItemInputed'].updateValueAndValidity()
  }
  back(): void {
    this.location.back();
  }

  selectVehicleModel() {
    var modalRef = this.modalService.open(VehicleModelSelectorModalComponent, { backdrop: 'static', size: 'lg', });
    modalRef.componentInstance.title = "Vehicle Model Selector"
    modalRef.closed.subscribe({
      next: (_) => {
        this.form.patchValue({ modelId: _.id, modelName: _.name })
      }
    })

  }
  addPart() {
    var modalRef = this.modalService.open(AddUpdatePartModalComponent, { backdrop: 'static', size: 'xl', });
    modalRef.componentInstance.title = "Add Repair Part"
    modalRef.componentInstance.modelId = this.form.value.modelId;
    modalRef.closed.subscribe({
      next: (_: PartComputationItem) => {
        var part: AssessmentItem = {
          ..._,
          assessmentId: this.form.value.id,
          itemType: 1,
          itemTypeName: ''
        }
        this.createPartForm(part)
        this.validate()
      }
    })

  }
  editPart(index:number) {   
    var modalRef = this.modalService.open(AddUpdatePartModalComponent, { backdrop: 'static', size: 'xl', });
    modalRef.componentInstance.title = "Edit Repair Part"
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.modelId = this.form.value.modelId;
    modalRef.componentInstance.model={...this.items.at(index).value} 
    modalRef.closed.subscribe({
      next: (_: PartComputationItem) => {
        const index = this.items.controls.findIndex(control => control.get('id')?.value === _.id);
        if(index>=0){
         this.items.removeAt(index)
        }        
        var part: AssessmentItem = {
          ..._,
          assessmentId: this.form.value.id,
          itemType: 1,
          itemTypeName: ''
        }
        this.createPartForm(part)
        this.validate()
      }
    })

  }
  get f() { return this.form.controls; }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
  get otherCosts(): FormArray {
    return this.form.get('otherCosts') as FormArray;
  }
  createPartForm(item: AssessmentItem) {
    const f = this.fb.group({
      id: [''],
      assessmentId: [this.form.value.id],
      partId: [''],
      partName: [''],
      conditionId: [''],
      conditionName: [''],
      quantity: [0],
      price: [0],
      markupRate: [0],
      markUp: [0],
      discountAmount: [0],
      discountRate: [0],
      taxCode: [''],
      taxAmount: [0],
      grossTotal: [0],
      contribution: [0],
      contributionRate: [0],
      totalQuote: [0],
      itemType: [1],
      itemTypeName: [''],

    });
    f.patchValue(item);
    this.items.push(f)

  }
  removeItem(index: number) {
    this.items.removeAt(index);
    this.validate()
  }

  addOtherCost() {
    var modalRef = this.modalService.open(AddUpdateServiceModalComponent, { backdrop: 'static', size: 'lg', });
    modalRef.componentInstance.title = "Add Other Cost"
    modalRef.closed.subscribe({
      next: (_: ComputationServiceItem) => {
        var otherCost: AssessmentOtherCost = {
          ..._,
          assessmentId: this.form.value.id,
          itemType: 1,
          itemTypeName: '',
        }
        this.createOtherCostForm(otherCost)
        this.validate()
      }
    })

  }
  createOtherCostForm(otherCost: AssessmentOtherCost) {
    const f = this.fb.group({
      assessmentId: [''],
      chargeId: [''],
      chargeName: [''],
      description: [''],
      amount: [0],
      taxCode: [''],
      taxAmount: [0],
      grossTotal: [0],
      id: [Guid.create().toString()],

    });
    f.patchValue(otherCost);
    this.otherCosts.push(f)
  }
  removeServiceItem(index: number) {
    this.otherCosts.removeAt(index);
    this.validate()
  }
  editServiceItem(index: number) {

  }


  onPhotoChange(valid: boolean) {
    this.form.patchValue({ photoUpload: valid })
  }

  validate() {
    let isValid = false;
    var items: AssessmentItem[] = cloneDeep(this.items.value);
    var otherCosts: AssessmentOtherCost[] = cloneDeep(this.otherCosts.value);
    if ((items && items.length > 0) || (otherCosts && otherCosts.length > 0)) {
      isValid = true
    }
    this.form.patchValue({ repairItemInputed: isValid })
  }


  get surveyItems(): FormArray {
    return this.f['surveyItems'] as FormArray;
  }
  createSurveyItemsForm(item: AssessmentSurveyItem) {
    const f = this.fb.group({
      assessmentId: ['',Validators.required],
      itemId: ['',Validators.required],
      itemName: [''],
      value: ['',Validators.required],
      valueName: [''],     
      id: [Guid.create().toString()],

    });
    f.patchValue(item);
    this.surveyItems.push(f)
  }
  updateDocuments(documents: DocumentUploadType[]) {
    let uploaded: boolean = true;
    if (documents && documents.filter((d) => d.mandatory && d.items.length === 0).length > 0) {
      uploaded = false;
    }
    this.form.patchValue({ madatoryDocsUploaded: uploaded });
  }
}

