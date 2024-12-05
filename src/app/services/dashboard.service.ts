import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private studentApiUrl = 'http://localhost:8222/api/v1/students'; // Replace with your students microservice URL
  private absenceApiUrl = 'http://localhost:8222/api/v1/absence'; // Replace with your absences microservice URL

  constructor(private http: HttpClient) {}

  // Get total number of students
  getTotalStudents(): Observable<number> {
    return this.http.get<number>(`${this.studentApiUrl}/count`, {
      withCredentials: true, // Ensure credentials are included
    });
  }

  // Get total monthly absences
  getTotalMonthlyAbsences(): Observable<number> {
    return this.http.get<number>(`${this.absenceApiUrl}/monthly`, {
      withCredentials: true, // Ensure credentials are included
    });
  }

  // Get today's absences
  getTodaysAbsences(): Observable<number> {
    return this.http.get<number>(`${this.absenceApiUrl}/today`, {
      withCredentials: true, // Ensure credentials are included
    });
  }

  // Combine all data in one request
  getDashboardData(): Observable<any> {
    return forkJoin({
      totalStudents: this.getTotalStudents(),
      monthlyAbsences: this.getTotalMonthlyAbsences(),
      todaysAbsences: this.getTodaysAbsences(),
    });
  }
}
