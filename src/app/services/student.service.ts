import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8222/api/v1/students'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }


  getStudents(): Observable<any>{
    return this.http.get(`${this.apiUrl}` , { withCredentials: true })
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }


  // Method to search students based on filters like name, specialiteId, and niveau
  searchStudents(specialiteId: number | null, niveau: string): Observable<any> {
    let params = new HttpParams();

   
    if (specialiteId !== null) {
      params = params.set('specialiteId', specialiteId.toString());
    }
    if (niveau) {
      params = params.set('niveau', niveau);
    }

    // Send GET request with query parameters to search for students
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

    // Method to delete a student by ID
    deleteStudent(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}` , { withCredentials: true });
    }
  
  updateStudent(id: string, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }
}
