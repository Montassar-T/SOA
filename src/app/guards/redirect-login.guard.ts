import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      // If token exists, redirect to the main page (or any page you want)
      this.router.navigate(['/main']);
      return false; // Prevent access to the login page
    }

    // If no token, allow access to the login page
    return true;
  }
}
