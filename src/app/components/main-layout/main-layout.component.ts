import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(private router: Router) {}









  logout(): void {
    // Remove the token or any other key from localStorage
    localStorage.removeItem('auth_token'); // Replace 'authToken' with the key you're using for authentication
    
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

}
