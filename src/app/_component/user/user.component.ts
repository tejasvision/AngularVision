import { Component, OnInit } from '@angular/core';
import { Role } from '../../_models/Role';
import { roleService } from '../../_services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { toastr } from './../../_helper/toast'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  submitted = false;
  UserForm: FormGroup;
  RoleList: Role[] = [];
 
  constructor(
    private formBuilder: FormBuilder,
    private roleServices: roleService,
    private toastr: toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.OnGetRole()
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

}
