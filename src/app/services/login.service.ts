import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8222/api/v1/auth/login';  // Backend API endpoint

  constructor(private http: HttpClient, private router: Router) { }

  login(login: string, password: string): Observable<any> {
    const loginData = { login, password };
  
    return this.http.post(this.apiUrl, loginData, { withCredentials: true });
  }
  


  // Check if the user is authenticated by checking if a token is stored
  isAuthenticated(): boolean {
    return localStorage.getItem('auth_token') !== null;  // Check if the token exists in localStorage
  }

  // Log out the user (remove user ID from localStorage)
  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
