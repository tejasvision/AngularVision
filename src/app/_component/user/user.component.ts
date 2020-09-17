import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Role } from '../../_models/Role';
import { roleService } from '../../_services/role.service';
import { userService } from '../../_services/user.service';
import { User } from '../../_models/User'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { toastr } from './../../_helper/toast'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfirmedValidator } from './../../_helper/confirmedvalidator';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  submitted = false;
  UserForm: FormGroup;
  RoleList: Role[] = [];
  UserList: User[] = [];
  _objUser: User = <User>{};
  _objDeleteUser: User = <User>{};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private roleServices: roleService,
    private userService: userService,
    private toastr: toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.dtOptions={
      scrollY:'54vh'
    }

    this.OnGetRole();
    this.OnGetUserList();

    this.UserForm = this.formBuilder.group({
      USERID: ['0'],
      FIRST_NAME: ['', Validators.required],
      LAST_NAME: ['', Validators.required],
      ROLEID: ['', Validators.required],
      EMAIL_ADDRESS: ['', Validators.required],
      PASSWORD: ['', Validators.required],
      CONFIRM_PASSWORD: ['', Validators.required],
      IS_ACTIVE: ['']
    },
    { 
      validator: ConfirmedValidator('PASSWORD', 'CONFIRM_PASSWORD')
    });

  }

  get UserInput() { return this.UserForm.controls; }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();
  }

  OnGetRole() {
    this.roleServices.GetParentRole()
      .pipe(first())
      .subscribe(
        data => {
          this.RoleList = data.DATA;
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

  OnGetUserList() {
    let intit = true;
    if (this.UserList.length > 0) {
      intit = false;
    }
    this.spinner.show();
    this.userService.GetUserList()
      .pipe(first())
      .subscribe(
        data => {
          this.UserList = data.DATA;
          if (intit) {
            this.dtTrigger.next();
          } else {
            this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

  OnEdit(_obj) {
    this.UserForm.get("USERID").setValue(_obj.USERID);
    this.UserForm.get("FIRST_NAME").setValue(_obj.FIRST_NAME);
    this.UserForm.get("LAST_NAME").setValue(_obj.LAST_NAME);
    this.UserForm.get("ROLEID").setValue(_obj.ROLEID);
    this.UserForm.get("EMAIL_ADDRESS").setValue(_obj.EMAIL_ADDRESS);
    this.UserForm.get("PASSWORD").setValue('vision');
    this.UserForm.get("CONFIRM_PASSWORD").setValue('vision');
    this.UserForm.get("IS_ACTIVE").setValue(_obj.IS_ACTIVE);
    $("#Active").prop("checked", _obj.IS_ACTIVE);
    $("#Active").iCheck('update');
  }

  OnClear() {
    this.submitted=false;
    this.UserForm.get("USERID").setValue('');
    this.UserForm.get("FIRST_NAME").setValue('');
    this.UserForm.get("LAST_NAME").setValue('');
    this.UserForm.get("ROLEID").setValue('');
    this.UserForm.get("EMAIL_ADDRESS").setValue('');
    this.UserForm.get("PASSWORD").setValue('');
    this.UserForm.get("CONFIRM_PASSWORD").setValue('');
    this.UserForm.get("IS_ACTIVE").setValue('');
    $("#Active").prop("checked", false);
    $("#Active").iCheck('update');
  }

  OnSubmit() {
    this.UserForm.get("IS_ACTIVE").setValue($("#Active").prop('checked'));
    this.submitted = true;

    if (this.UserForm.invalid) {
      return;
    }

    this._objUser.USERID = this.UserInput.USERID.value;
    this._objUser.FIRST_NAME = this.UserInput.FIRST_NAME.value;
    this._objUser.LAST_NAME = this.UserInput.LAST_NAME.value;
    this._objUser.ROLEID = this.UserInput.ROLEID.value;
    this._objUser.EMAIL_ADDRESS = this.UserInput.EMAIL_ADDRESS.value;
    this._objUser.PASSWORD = this.UserInput.PASSWORD.value;
    this._objUser.IS_ACTIVE = this.UserInput.IS_ACTIVE.value;
    this._objUser.COMMAND_TYPE = "SAVE";

    this.OnManageUser(this._objUser);
  }

  OnDelete(_obj) {
    _obj.COMMAND_TYPE = "DELETE";
    this.OnManageUser(_obj);
    $("#modal-delete-user").modal('hide');
  }

  OnManageUser(_obj) {

    this.spinner.show();

    this.userService.UserSave(_obj)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          this.toastr.success(data.MESSAGE);
          this.OnClear();
          $("#modal-add-user").modal('hide');
          this.OnGetUserList();
          //this.dtTrigger.next();
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

}
