import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.component.html',
  styleUrls: ['./before-login.component.scss']
})
export class BeforeLoginComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    if (this.UserSession != 'null' && this.UserSession != null) {
      this.router.navigate(['/home']);
    }
  }

  get UserSession() { return JSON.parse(localStorage.getItem('Vision_User')) }

}
