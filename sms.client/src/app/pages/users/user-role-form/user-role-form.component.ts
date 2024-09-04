import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';

import { first } from 'rxjs/operators';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { UserRoleService } from '../../../shared/services/user-role.service';
import { Role } from '../../../shared/models/users/role';


@Component({
  selector: 'app-user-role-form',
  templateUrl: './user-role-form.component.html',
  styleUrls: ['./user-role-form.component.scss']
})
export class UserRoleFormComponent extends BaseFormComponent implements OnInit {
 
  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roleService: UserRoleService,
    private router:Router,
    private location:Location
   
  ) {
    super();

   }

  ngOnInit(): void {

    this.form = this.createForm();
    this.route.params.pipe().subscribe(params => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit Role' : 'New Role';
      this.breadCrumbItems=[
        {label:"User Management"},
        {label:"Role"},
        {label:this.pageTitle,active:true}
      ]
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();
    });
  }
  initForm() {
     if (this.editMode) {
        this.roleService.findById(this.id).pipe(first()).subscribe(data => {
          this.form.patchValue(data);
        });
      }

  }
  createForm(): FormGroup {
    const f = this.fb.group({
      name: ['', Validators.required],
      id: [Guid.create().toString()],
    });
    return f;
  }
  onSubmit(){
    this.submitted=true;
    if (this.validateForm(this.form)) {
      const model = Object.assign(this.form.value) as Role;
      console.log('model', model);

      this.roleService
        .save(model)
        .pipe(first())
        .subscribe(
          result=> {
            this.router.navigate(['/um/role']);
          },
          (errors) => {
            this.errors = errors;
            console.log('Error =>', this.errors);
          }
        );
    }

  }
  back() {
    this.location.back()
  }

}
