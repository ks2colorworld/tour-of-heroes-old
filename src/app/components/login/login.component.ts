import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin(): void {
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/user']);
    });
  }

  tryTwitterLogin(): void {
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/user']);
    });
  }

  tryGoogleLogin(): void {
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    });
  }

  tryLogin(value: { email: string; password: string; }): void {
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
