import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';  // Import the service
import { Student } from '../../model/student.model';  // Import the Student model
import { Specialite } from '../../model/specialite.model';  // Import Specialite model
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents(); // Fetch students on component load
  }


  delete(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          // After deleting, reload the students list to update the UI
          this.loadStudents();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }


  modify(id: string): void {
    this.router.navigate([`/main/gerer-etudiant/${id}`]); // Navigate to the editing route with the student id
  }
  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data.map(student => {
          // Ensure specialite is an object, it's already returned by the API
          if (student.specialite && typeof student.specialite === 'object') {
            student.specialite = new Specialite(student.specialite.id, student.specialite.name);  // Create Specialite object
          }
          return student;
        });
        console.log(this.students); // Log the students
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
}
