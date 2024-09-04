import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';
import { ReportGroupItemService } from '../../../shared/services/report-group-item.service';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { CustomValidators } from '../../../shared/custom-validators/custom-validators';
import { ReportGroup } from '../../../shared/models/reports/report-group';
import { ReportGroupItem } from '../../../shared/models/reports/report-group-item';
import { Location } from '@angular/common';



@Component({
  selector: 'app-report-group-item-form',
  templateUrl: './report-group-item-form.component.html',
  styleUrls: ['./report-group-item-form.component.scss']
})
export class ReportGroupItemFormComponent extends BaseFormComponent implements OnInit {


  groupId: any;
  group:ReportGroup={
    id: '',
    no: 0,
    name: ''
  };
  form: FormGroup= this.fb.group({})

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    public location: Location,
    private service: ReportGroupItemService,
    private groupService:ReportGroupItemService
  ) { super()}

  setPageTitle(){
    this.pageTitle = this.editMode ? `Edit Report`: `New Report`;
    this.breadCrumbItems=[
      {label:"Setting"},
      {label:"Report Group"},
      {label:this.group.name},
      {label:"Report"},
      {label:this.pageTitle,active:true}
    ]

  }

  ngOnInit(): void {

    this.form=this.createForm()
    this.route.params.pipe().subscribe(params => {
      this.groupId = params['groupId'] ? params['groupId'] : '';
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Report Group' : 'New Report Group';

      this.buttonText = this.editMode ? 'Update' : 'Create';

      if(!this.groupId){
        this.router.navigate(['/settings/reportgroup/']);
      }else{

        this.loadGroup()


      }
      if(this.id){
        this.initForm();
      }

    });

  }
  loadGroup(){
    this.groupService.findById(this.groupId)
    .pipe(first())
    .subscribe(group => {
      this.group = group;
      this.setPageTitle()
    });
  }
  createForm(): FormGroup {
    const f = this.fb.group({
      no: ['', [Validators.required,CustomValidators.numeric]],
      name: ['', Validators.required],
      reportUrl: ['', Validators.required],
      id: [Guid.create().toString()],
      groupId:[],
    });
    return f;

  }
  initForm() {
    this.service.findById(this.id).pipe(first()).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  onSubmit(){
    this.submitted=true;

    if (this.validateForm(this.form)) {
      const model = Object.assign(this.form.value) as ReportGroupItem;
      console.log('model', model);
      model.groupId=this.group.id

      this.service
        .save(model)
        .subscribe({
          next: (_) => {
            debugger
            this.location.back()
            //this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (errors) => {
            this.errors = errors;
            console.log('Error =>', this.errors);
          }
        });

    }
  }
  back(): void {
    this.location.back()
  }


}
