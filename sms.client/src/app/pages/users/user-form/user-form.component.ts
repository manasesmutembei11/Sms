import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { first } from 'rxjs';

import { AccountPickerModalComponent } from '../account-picker-modal/account-picker-modal.component';
import { cloneDeep } from 'lodash';
import Swal from 'sweetalert2';
import { BaseFormComponent } from '../../../shared/components/base-form-component';
import { LookupItem } from '../../../shared/models/responses/lookup-item';
import { UserService } from '../../../shared/services/user.service';
import { UserRoleService } from '../../../shared/services/user-role.service';
import { Account, User, UserRole } from '../../../shared/models/users/user';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup= this.fb.group({});
  items: LookupItem[]=[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router:Router,
    private userService:UserService,
    private roleService:UserRoleService,  
    private location:Location,
    private modalService: NgbModal,
    
   
  ) { super();}

  ngOnInit(): void {

    this.form = this.createForm();
    this.route.params.pipe().subscribe(params => {
      this.id = params['id'] ? params['id'] : '';
      this.editMode = params['id'] != null;
      this.pageTitle = this.editMode ? 'Edit User' : 'New User'
      this.breadCrumbItems=[
        {label:"User Management"},
        {label:"User"},
        {label:this.pageTitle,active:true}
      ]
      this.buttonText = this.editMode ? 'Update' : 'Create';
      this.initForm();


    });
  
  }
  


  createForm(): FormGroup {
    const f = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber:[null, Validators.required],
      email: ['', [Validators.required,Validators.email]],
      active:[false],
      warehouseId:[null],
      id: [Guid.create().toString()],
      roles: this.fb.array([]),
      accounts: this.fb.array([]),
    });
    return f;
  }
  get f() { return this.form.controls; }
  createRoleForm(role: UserRole) {
    const fa = this.f['roles'] as FormArray;
    const f = this.fb.group({
      id: [''],
      name: ['',Validators.required],
      checked: [false],
    });

    f.patchValue(role);
    fa.push(f);
  }
  createAccountForm(item: Account) {
    const f = this.fb.group({     
      id: [''],
      name: [''],
      typeName: [''],
    });
    f.patchValue(item);
    const fa = this.accountsFormArray;
    fa.push(f);
  }
  initForm() {
    if (this.editMode) {
      //this.form.controls['userName'].disable()
      this.userService.findById(this.id).pipe(first()).subscribe(data => {
       // data.phoneNumber= {phoneNumber:data.phoneNumber};
        this.form.patchValue(data);
        for (const role of data.roles) {
          this.createRoleForm(role);
        }
        for (const account of data.accounts) {
          this.createAccountForm(account);
        }
      });
    }else{
      this.roleService.lookupList().pipe(first()).subscribe(data=> {
        for (const role of data) {
          this.createRoleForm(role);
        }
      })
    }
  }
  get accountsFormArray(): FormArray {
    return this.f['accounts'] as FormArray;
  }
  get rolesFormArray() {
    return (this.f['roles'] as FormArray).controls;
  }
  onSubmit(){
    this.submitted=true;
    if (this.validateForm(this.form)) {
      //const model = Object.assign(this.form.value) as User;
      const model:User = {... this.form.value};

      //model.phoneNumber = model.phoneNumber.intelNumber;
      console.log('model', model);

      this.userService
        .save(model)
        .subscribe({
          next: (_) => {
            this.router.navigate(['/um/user']);
          },
          error: (errors) => {
            this.errors = errors;
            console.log('Error =>', this.errors);
          }
        });

    }
  }
  back() {
    this.location.back()
  }

  add() {
    debugger;
    var modalRef = this.modalService.open(AccountPickerModalComponent, {
      backdrop: 'static',
      size: 'lg',    
     
    });
    modalRef.componentInstance.itemSelectedEvent.subscribe({
      next: (item: any) => {
        // const already = cloneDeep<Account[]>(this.form.value.accounts).length>0;
        // if (already) {
        //   Swal.fire(
        //     'Add Account!',
        //     'You can only add one account per user!',
        //     'warning'
        //   )
        //   return
        // }
        const exits = cloneDeep<Account[]>(this.form.value.accounts).find(s => s.id == item.id);
        if (exits) {
          Swal.fire(
            'Add Account!',
            'Selected account already added. Please select another account!',
            'warning'
          )
          return
        }
        var d: Account = {
          id: item.id,
          name: item.name,
          code:item.code,
          typeName: item.typeName
        }
        this.createAccountForm(d)
      }
    })




  }
  remove(index: number) {
    this.accountsFormArray.removeAt(index)
  }

}
