import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Role } from '../../_models/Role';
import { roleService } from '../../_services/role.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { toastr } from './../../_helper/toast'
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { GetFormValue } from '../../_helper/Common'
declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  submitted = false;
  RoleForm: FormGroup;
  RoleList: Role[] = [];
  ParentRoleList: Role[] = [];
  _objRole: Role = <Role>{};
  _objDeleteRole: Role = <Role>{};
  initRoleForm: Role = <Role>{};

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleServices: roleService,
    private http: HttpClient,
    private toastr: toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.RoleForm = this.formBuilder.group({
      ROLEID: ['0'],
      ROLE_NAME: ['', Validators.required],
      PARENT_ROLE: ['0'],
      IS_ACTIVE: [false]
    });

    this.initRoleForm = <Role>GetFormValue(this.RoleInput);

    this.dtOptions={
      scrollY:'54vh'
    }

    this.OnGetRole();
    this.OnGetParentRole();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();
  }

  get RoleInput() { return this.RoleForm.controls; }

  OnSubmit() {
    this.RoleForm.get("IS_ACTIVE").setValue($("#Active").prop('checked'));
    this.submitted = true;

    if (this.RoleForm.invalid) {
      return;
    }

    this._objRole =<Role>GetFormValue(this.RoleInput);
    this._objRole.COMMAND_TYPE = "SAVE";
    this.OnManageRole(this._objRole);
  }

  OnClear() {
    this.submitted = false;
    this.RoleForm.patchValue(this.initRoleForm);
    $("#Active").prop("checked", false);
    $("#Active").iCheck('update');
  }

  OnEdit(_obj) {
    this.RoleForm.patchValue(_obj);
    $("#Active").prop("checked", _obj.IS_ACTIVE);
    $("#Active").iCheck('update');
  }

  OnDelete(_obj) {
    _obj.COMMAND_TYPE = "DELETE";
    this.OnManageRole(_obj);
    $("#modal-delete-role").modal('hide');
  }

  OnManageRole(_obj) {

    this.spinner.show();

    this.roleServices.roleSave(_obj)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          this.toastr.success(data.MESSAGE);
          this.OnClear();
          $("#modal-add-role").modal('hide');
          this.OnGetRole();
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

  OnGetRole() {

    let intit = true;
    if (this.RoleList.length > 0) {
      intit = false;
    }

    this.spinner.show();
    this.roleServices.roleGet()
      .pipe(first())
      .subscribe(
        data => {
          this.RoleList = data.DATA;
          if (intit) {
            this.dtTrigger.next();
          }else{
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

  OnGetParentRole() {
    this.roleServices.GetParentRole()
      .pipe(first())
      .subscribe(
        data => {
          this.ParentRoleList = data.DATA;
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }
}