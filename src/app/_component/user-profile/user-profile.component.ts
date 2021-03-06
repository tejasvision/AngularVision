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
import { GetFormValue } from '../../_helper/Common'
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  submitted = false;
  UserForm: FormGroup;
  _objUser: User = <User>{};
  ProfileImage = [];

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

  OnSetValue() {
    this.UserForm.patchValue(this.UserSession);
  }

  OnSubmit() {

    this.submitted = true;

    if (this.UserForm.invalid) {
      return;
    }

    this._objUser = <User>GetFormValue(this.UserInput);
    this._objUser.COMMAND_TYPE = "SAVE_PROFILE";

    this.spinner.show();

    this.userService.UserSave(this._objUser)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem("Vision_User", JSON.stringify(data.DATA));
          this.spinner.hide();
          this.toastr.success(data.MESSAGE);
          $("#modal-add-user").modal('hide');
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

  onProfileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.ProfileImage.push(event.target.files[i]);
    }
  }

  OnProfileUpdate() {

    if (this.ProfileImage.length == 0) {
      this.toastr.warning('Please Select Profile Image.');
      return;
    }

    const _objProfile = new FormData();


    _objProfile.append("userId", this.UserSession.USERID);
    _objProfile.append("ProfileImage", this.ProfileImage[0]);

    this.spinner.show();

    this.userService.userProfileUpdate(_objProfile)
      .pipe(first())
      .subscribe(
        res => {
          this.spinner.hide();
          if (res.STATUS == 1) {
            this.ProfileImage = [];
            this.toastr.success(res.MESSAGE);
            localStorage.setItem("Vision_User", JSON.stringify(res.DATA));
          } else {
            this.toastr.warning(res.MESSAGE);
          }

          $("#modal-change-profile").modal('hide');
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

}
