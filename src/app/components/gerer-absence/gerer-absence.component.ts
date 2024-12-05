import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from '../../services/absence.service';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Absence } from '../../model/absence.model';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-gerer-absence',
  templateUrl: './gerer-absence.component.html',
  styleUrls: ['./gerer-absence.component.css']
})
export class GererAbsenceComponent implements OnInit {
  absenceForm: FormGroup;
  absenceId: number | null = null;  // Ensure absenceId is treated as a number
  isEditing = false;
  students: Student[] = []; // List of students
  specialiteOptions = [{"id": 4, "name": "GE"}, {"id": 5, "name": "GM"}, {"id": 3, "name": "SEG"}, {"id": 2, "name": "TI"}];

  // Filtering options
  selectedSpecialite: number | null = null;  // Ensure specialite is a number
  selectedNiveau: any = null;  // Niveau can be string or null

  constructor(
    private fb: FormBuilder,
    private absenceService: AbsenceService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form group with validation
    this.absenceForm = this.fb.group({
      studentId: ['', [Validators.required]],  // To select student
      date: ['', [Validators.required]],  // Date of absence
      reason: ['', [Validators.required]],  // Absence reason
      matiere: ['', [Validators.required]],  // Subject of absence
    });
  }

  ngOnInit(): void {
    // Check if we're editing an existing absence
    this.activatedRoute.paramMap.subscribe(params => {
      const absenceId = params.get('id');
      if (absenceId) {
        this.absenceId = Number(absenceId); // Convert to number
        if (isNaN(this.absenceId)) {
          console.error('Invalid ID parameter:', absenceId);
          return; // Handle invalid ID
        }
        this.isEditing = true;
        this.loadAbsenceData(this.absenceId); // Load existing absence data
      }
    });

    this.fetchStudents(); // Fetch students based on filters
  }

  // Fetch students based on specialite and niveau
  fetchStudents(): void {
    // Call searchStudents with selected filters
    this.studentService.searchStudents(
      this.selectedSpecialite,  // Specialite ID filter, already a number or null
      this.selectedNiveau  // Niveau filter, can be string or null
    ).subscribe(
      (students: Student[]) => {
        this.students = students;
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // Function to load absence data for editing
  loadAbsenceData(id: number): void {
    this.absenceService.getAbsenceById(id).subscribe(
      (absence: Absence) => {
        this.absenceForm.patchValue({
          studentId: absence.studentId,
          date: absence.date,
          reason: absence.reason,
          matiere: absence.matiere,
        });
      },
      error => {
        console.error('Error loading absence data:', error);
      }
    );
  }

  // Submit form data
  onSubmit(): void {
    if (this.absenceForm.invalid) {
      return; // Don't submit if the form is invalid
    }

    const absenceData = this.absenceForm.value;
    if (this.isEditing) {
      // Update existing absence
      this.absenceService.updateAbsence(this.absenceId!, absenceData).subscribe(
        () => {
          this.router.navigate(['/main/absence']); // Redirect after update
        },
        error => {
          console.error('Error updating absence:', error);
        }
      );
    } else {
      // Add new absence
      this.absenceService.addAbsence(absenceData).subscribe(
        () => {
          this.router.navigate(['/main/absence']); // Redirect after adding the absence
        },
        error => {
          console.error('Error adding absence:', error);
        }
      );
    }
  }

  // Cancel function to navigate back
  annuler(): void {
    this.router.navigate(['/main/absence']); // Redirect to the absence list
  }

  // Getter methods for form controls
  get studentId() {
    return this.absenceForm.get('studentId');
  }

  get date() {
    return this.absenceForm.get('date');
  }

  get reason() {
    return this.absenceForm.get('reason');
  }

  get matiere() {
    return this.absenceForm.get('matiere');
  }

  // Filtering options for students
  onSpecialiteChange(selected: string): void {
    this.selectedSpecialite = selected ? parseInt(selected) : null;  // Convert to number or set to null
    this.fetchStudents(); // Re-fetch students based on the new filter
  }

  onNiveauChange(selected: string): void {
    this.selectedNiveau = selected || null;  // Ensure it's either string or null
    this.fetchStudents(); // Re-fetch students based on the new filter
  }
}
