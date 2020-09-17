import { Component, OnInit } from '@angular/core';
import { Role } from '../../_models/Role';
import { roleService } from '../../_services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { toastr } from './../../_helper/toast'
import { ITreeOptions } from '@circlon/angular-tree-component';


@Component({
  selector: 'app-role-access',
  templateUrl: './role-access.component.html',
  styleUrls: ['./role-access.component.scss']
})
export class RoleAccessComponent implements OnInit {

  RoleList: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleServices: roleService,
    private toastr: toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.OnGetRole();
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

  nodes = [
    {
      name: 'Home',id:1
    },
    {
      name: 'Account',
      children: [
        {
          name: 'User', children: [
            { name: 'Add User',id:2 },
            { name: 'Edit User',id:3 },
            { name: 'Delete User',id:4 }
          ]
        },
        {
          name: 'Role', children: [
            { name: 'Add Role',id:5 },
            { name: 'Edit Role',id:6 },
            { name: 'Delete Role',id:7 }
          ]
        },
        {
          name: 'Role Access',id:8
        },
      ]
    }
  ];

  options: ITreeOptions = {
    useCheckbox: true
  };

  onSelect(event){
    let selectedTreeList = Object.entries(event.treeModel.selectedLeafNodeIds)
     .filter(([key, value]) => {
            return (value === true);
      }).map((node) => node[0]);
      debugger
  }
  onDeselect(event){
    let selectedTreeList = Object.entries(event.treeModel.selectedLeafNodeIds)
     .filter(([key, value]) => {
            return (value === true);
      }).map((node) => node[0]);
      debugger
  }
}
