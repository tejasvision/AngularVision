import { Component, OnInit } from '@angular/core';
import { Role } from '../../_models/Role';
import { roleService } from '../../_services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { toastr } from './../../_helper/toast'
import { ITreeOptions } from '@circlon/angular-tree-component';
import { roleaccessService } from '../../_services/role-access.service'
import { TreeviewItem, TreeviewConfig, DownlineTreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'app-role-access',
  templateUrl: './role-access.component.html',
  styleUrls: ['./role-access.component.scss']
})
export class RoleAccessComponent implements OnInit {

  RoleList: Role[] = [];
  nodes = [];
  RoleID = 0;
  SelectedMenus = [];

  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  constructor(
    private formBuilder: FormBuilder,
    private roleServices: roleService,
    private toastr: toastr,
    private spinner: NgxSpinnerService,
    private RoleAccessService: roleaccessService
  ) { }

  ngOnInit(): void {
    this.OnGetRole();
    // this.items = this.getBooks();
    this.OnGetRoleAccess();
  }

  OnGetRole() {
    this.spinner.show();
    this.roleServices.GetParentRole()
      .pipe(first())
      .subscribe(
        data => {
          this.RoleList = data.DATA;
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

  OnGetRoleAccess() {
    let _obj = {
      roleid: this.RoleID
    }
    this.spinner.show();
    this.RoleAccessService.getRoleAccess(_obj)
      .pipe(first())
      .subscribe(
        data => {
          let d = JSON.parse(JSON.stringify(data.DATA).toLowerCase());
          let aar = [];
          if (data.STATUS == 1) {
            d.forEach(element => {
              const iTem = new TreeviewItem(element);
              aar.push(iTem);
            });
          }
          this.items = aar;

          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]): void {
    let rows = [];
    downlineItems.forEach(downlineItem => {
      const value = downlineItem;
      rows.push(value);
    });
    this.SelectedMenus = rows;
  }

  OnSubmit() {
    if (this.RoleID == null || this.RoleID == 0) {
      this.toastr.warning('Please select Role.');
      return;
    }

    let _obj = {
      ROLEID: this.RoleID,
      MENU_ITEM_CODES: this.SelectedMenus.toString()
    }

    this.spinner.show();
    this.RoleAccessService.roleAccessSave(_obj)
      .pipe(first())
      .subscribe(
        res => {
          if (res.STATUS == 1)
            this.toastr.success(res.MESSAGE);
          else
            this.toastr.warning(res.MESSAGE);

          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message);
          this.spinner.hide();
        });
  }

}
