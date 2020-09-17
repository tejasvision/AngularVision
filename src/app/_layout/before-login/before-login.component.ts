import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.component.html',
  styleUrls: ['./before-login.component.scss']
})
export class BeforeLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (this.UserSession != 'null' && this.UserSession != null) {
      window.location.href = '/home';
    }
  }

  get UserSession() { return JSON.parse(localStorage.getItem('Vision_User')) }

}
