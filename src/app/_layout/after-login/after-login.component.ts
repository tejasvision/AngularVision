import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss']
})
export class AfterLoginComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.UserSession == 'null' || this.UserSession == null) {
      this.router.navigate(['/']);
    }
  }

  get UserSession() { return JSON.parse(localStorage.getItem('Vision_User')) }

  OnLogout() {
    localStorage.setItem('Vision_User', null);
    localStorage.removeItem('Vision_User');
    this.router.navigate(['/']);
  }

}
