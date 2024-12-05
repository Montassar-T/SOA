import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Ensure that localStorage is only accessed in the browser
    if (typeof window !== 'undefined') {
      const isAuthenticated = !!localStorage.getItem('auth_token'); // Check if the token exists in localStorage

      if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // If not running in the browser (e.g., during SSR), prevent access
      this.router.navigate(['/login']);
      return false;
    }

    // If authenticated, allow access
    return true;
  }
}
