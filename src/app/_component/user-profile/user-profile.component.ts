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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  submitted=false;
  UserForm: FormGroup;
  _objUser: User = <User>{};

  constructor(
    private formBuilder: FormBuilder,
    private roleServices: roleService,
    private userService: userService,
    private toastr: toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      USERID: ['0'],
      FIRST_NAME: ['', Validators.required],
      LAST_NAME: ['', Validators.required],
      EMAIL_ADDRESS: ['', Validators.required],
      ADDRESS: ['', Validators.required],
      DESCRIPTION: ['', Validators.required],
      STATE: ['', Validators.required],
      CITY: ['', Validators.required],
      ZIP: ['', Validators.required]
    });
    this.OnSetValue(); 
  }

  get UserInput() { return this.UserForm.controls; }
  get UserSession() { return JSON.parse(localStorage.getItem('Vision_User')) }

  OnSetValue(){
    this.UserForm.get("USERID").setValue(this.UserSession.USERID);
    this.UserForm.get("FIRST_NAME").setValue(this.UserSession.FIRST_NAME);
    this.UserForm.get("LAST_NAME").setValue(this.UserSession.LAST_NAME);
    this.UserForm.get("EMAIL_ADDRESS").setValue(this.UserSession.EMAIL_ADDRESS);
    this.UserForm.get("ADDRESS").setValue(this.UserSession.ADDRESS);
    this.UserForm.get("DESCRIPTION").setValue(this.UserSession.DESCRIPTION);
    this.UserForm.get("STATE").setValue(this.UserSession.STATE);
    this.UserForm.get("CITY").setValue(this.UserSession.CITY);
    this.UserForm.get("ZIP").setValue(this.UserSession.ZIP);
  }

  OnSubmit() {
    
    this.submitted = true;

    if (this.UserForm.invalid) {
      return;
    }

    this._objUser.USERID = this.UserInput.USERID.value;
    this._objUser.FIRST_NAME = this.UserInput.FIRST_NAME.value;
    this._objUser.LAST_NAME = this.UserInput.LAST_NAME.value;
    this._objUser.EMAIL_ADDRESS = this.UserInput.EMAIL_ADDRESS.value;
    this._objUser.ADDRESS = this.UserInput.ADDRESS.value;
    this._objUser.DESCRIPTION = this.UserInput.DESCRIPTION.value;
    this._objUser.STATE = this.UserInput.STATE.value;
    this._objUser.CITY = this.UserInput.CITY.value;
    this._objUser.ZIP = this.UserInput.ZIP.value;
    this._objUser.COMMAND_TYPE = "SAVE_PROFILE";

    this.spinner.show();

    this.userService.UserSave(this._objUser)
      .pipe(first())
      .subscribe(
        data => {
          debugger
          localStorage.setItem("Vision_User",JSON.stringify(data.DATA));
          this.spinner.hide();
          this.toastr.success(data.MESSAGE);
          $("#modal-add-user").modal('hide');
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

}
