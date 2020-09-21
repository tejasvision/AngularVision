import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SideMenu } from '../../_models/Menu'
import { ConfirmedValidator } from './../../_helper/confirmedvalidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { toastr } from './../../_helper/toast';
import { GetFormValue } from '../../_helper/Common';
import { loginService } from '../../_services/login.service';
import { first } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss']
})
export class AfterLoginComponent implements OnInit {

  submitted = false;
  ChangePasswordForm: FormGroup;
  SideMenuList: SideMenu[];
  initChangePasswordForm: {};


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: toastr,
    private spinner: NgxSpinnerService,
    private loginService: loginService
  ) { }

  ngOnInit(): void {
    if (this.UserSession == 'null' || this.UserSession == null) {
      this.router.navigate(['/']);
    }
    this.SideMenuList = this.SideBarMenu;

    this.ChangePasswordForm = this.formBuilder.group({
      USERID: [this.UserSession.USERID],
      OLD_PASSWORD: ['', Validators.required],
      NEW_PASSWORD: ['', Validators.required],
      CONFIRM_PASSWORD: ['', Validators.required]
    },
      {
        validator: ConfirmedValidator('NEW_PASSWORD', 'CONFIRM_PASSWORD')
      });

    this.initChangePasswordForm = GetFormValue(this.ChangePasswordInput);
  }

  get UserSession() { return JSON.parse(localStorage.getItem('Vision_User')) }
  get SideBarMenu() { return JSON.parse(localStorage.getItem('Vision_SideMenu')) }
  get ChangePasswordInput() { return this.ChangePasswordForm.controls; }

  OnLogout() {
    localStorage.setItem('Vision_User', null);
    localStorage.removeItem('Vision_User');
    this.router.navigate(['/']);
  }

  OnSubmit() {

    this.submitted = true;

    if (this.ChangePasswordForm.invalid) {
      return;
    }

    let _obj = GetFormValue(this.ChangePasswordInput);

    this.spinner.show();

    this.loginService.changePassword(_obj)
      .pipe(first())
      .subscribe(
        res => {
          this.spinner.hide();
          if (res.STATUS == 1) {
            $("#modal-change-password").modal('hide');
            this.toastr.success(res.MESSAGE);
          }
          else
            this.toastr.warning(res.MESSAGE);
          this.OnClear();
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });

  }

  OnClear() {
    this.submitted = false;
    this.ChangePasswordForm.patchValue(this.initChangePasswordForm);
  }

}
