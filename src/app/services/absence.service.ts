import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private apiUrl = `http://localhost:8222/api/v1/absence`; // Adjust the endpoint to your backend's API URL

  constructor(private http: HttpClient) { }

  // Fetch all absences, including related student data
  getAbsences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Get request to fetch all absences
  }

  // Fetch an absence by its ID
  getAbsenceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // Get request to fetch a specific absence
  }

  // Add a new absence
  addAbsence(absence: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, absence); // Post request to add a new absence
  }

  // Update an existing absence by its ID
  updateAbsence(id: number, absence: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, absence); // Put request to update the absence
  }

  // Delete an absence by its ID
  deleteAbsence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // Delete request to remove the absence
  }
}
