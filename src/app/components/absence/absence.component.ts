import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../../services/absence.service'; // Service to handle absence data
import { StudentService } from '../../services/student.service'; // Service to handle student data
import { Router } from '@angular/router';
import { Absence } from '../../model/absence.model'; // Model for Absence
import { Student } from '../../model/student.model'; // Model for Student (if needed)

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  absences: Absence[] = []; // This will hold the list of absences
  studentDetails: Student[] = []; // Array to hold student details (if needed)
  studentNameMap: { [id: number]: string } = {}; // Map to store student names by ID

  constructor(
    private absenceService: AbsenceService, // Service to handle absence data
    private studentService: StudentService, // Service to fetch student data
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAbsences(); // Load absences when the component initializes
  }

  // Fetch the absences from the service
  loadAbsences(): void {
    this.absenceService.getAbsences().subscribe(
      (data) => {
        this.absences = data; // Assign fetched data to absences array
        this.fetchStudentNames(); // Fetch all student names for mapping

      
        console.log(data);
      },
      (error) => {
        console.error('Error fetching absences:', error);
      }
    );
  }
  fetchStudentNames(): void {
    const studentIds = [...new Set(this.absences.map((a) => a.studentId))]; // Ensure field matches API response
    studentIds.forEach((id) => {
      this.studentService.getStudentById(id).subscribe(
        (student) => {
          this.studentNameMap[id] = `${student.nom} ${student.prenom}`;
          console.log("monta" + student?.nom)
          console.log(`Mapped: ${id} -> ${this.studentNameMap[id]}`);
        },
        (error) => {
          console.error(`Error fetching student with ID ${id}:`, error);
        }
      );
    });
  }
  

     // Get student's full name by ID from the map
  getStudentNameById(studentId: number): string {
    return this.studentNameMap[studentId] || 'Loading...';
  }

  // Delete an absence record
  delete(absenceId: number): void {
    if (confirm('Are you sure you want to delete this absence?')) {
      this.absenceService.deleteAbsence(absenceId).subscribe(
        () => {
          this.loadAbsences(); // Reload the list after deletion
        },
        (error) => {
          console.error('Error deleting absence:', error);
        }
      );
    }
  }
}
