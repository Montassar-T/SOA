import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'; // Assuming the service is in the same folder
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalid: boolean = false; // For invalid login flag


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    // Initializing form group with form controls and validation
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(4)]], // Email required with valid format
      password: ['', [Validators.required, Validators.minLength(6)]], // Password required with min length of 6
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.loginForm.invalid) {
      return; // Stop if form is invalid
    }
  
    const { login, password } = this.loginForm.value;
  
    this.loginService.login(login, password).subscribe(
      (response) => {
        // Assuming the response contains a token (e.g., response.token)
        if (response.token) {
          // Save the token in localStorage (or sessionStorage)
          localStorage.setItem('auth_token', response.token);
  
          // Optionally, navigate to another page after login is successful
          this.router.navigate(['/main']);
        }
      },
      (error) => {
        // If login fails, show invalid login flag
        this.invalid = true;
      }
    );
  }

  // Getter for easier access to form controls
  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
