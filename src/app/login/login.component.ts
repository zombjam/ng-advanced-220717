import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  orig_body_className = document.body.className;

  data: any = {
    email: '',
    password: '',
    isRememberMe: true,
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }

  doLogin() {
    localStorage.setItem('apikey', 'TEST');
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(returnUrl);
  }

  isInValid(ctrl: NgModel) {
    return ctrl.invalid && ctrl.touched;
  }

  isValid(ctrl: NgModel) {
    return ctrl.valid;
  }
}
