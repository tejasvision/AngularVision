import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { loginService } from '../../_services/login.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { toastr } from './../../_helper/toast'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  LoginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: loginService,
    private http: HttpClient,
    private toastr: toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      EMAIL_ADDRESS: ['', Validators.required],
      PASSWORD: ['', Validators.required],
      REMEMBERME: [false]
    });
  }

  get LoginInput() { return this.LoginForm.controls; }

  OnSubmit() {
    this.LoginForm.get("REMEMBERME").setValue($("#RememberMe").prop('checked'));
    this.submitted = true;

    if (this.LoginForm.invalid) {
      return;
    }

    let _obj = {
      EMAIL_ADDRESS: this.LoginInput.EMAIL_ADDRESS.value,
      PASSWORD: this.LoginInput.PASSWORD.value
    };

    this.loginService.userLogin(_obj)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          if(data.STATUS==1){
            this.toastr.success(data.MESSAGE);
            this.router.navigate(['/home']);
          }else{
            this.toastr.warning(data.MESSAGE);
          }
          
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });

  }

}
