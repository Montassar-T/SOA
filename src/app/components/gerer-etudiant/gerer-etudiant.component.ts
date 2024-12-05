import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service'; // Replace with your actual service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-gerer-etudiant',
  templateUrl: './gerer-etudiant.component.html',
  styleUrls: ['./gerer-etudiant.component.css']
})
export class GererEtudiantComponent implements OnInit {
  studentForm: FormGroup;
  studentId: string | null = null;
  isEditing = false;

  // Options for the dropdown of 'specialite'
  specialiteOptions = [{"id":4,"name":"GE"},{"id":5,"name":"GM"},{"id":3,"name":"SEG"},{"id":2,"name":"TI"}];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService, // Inject the service
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form group with validation
    this.studentForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      specialite: ['', [Validators.required]],
      niveau: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Subscribe to the route parameters to check if we're editing an existing student
    this.activatedRoute.paramMap.subscribe(params => {
      this.studentId = params.get('id'); // Get student ID from the route
      if (this.studentId) {
        this.isEditing = true;
        this.loadStudentData(this.studentId); // Load the student data for editing
      }
    });
  }

  // Function to load student data for editing
  loadStudentData(id: string): void {
    this.studentService.getStudentById(parseInt(id)).subscribe(
      (student: Student) => {
        this.studentForm.patchValue({
          nom: student.nom,
          prenom: student.prenom,
          specialite: student.specialite.id, // Assuming specialite is an object with id
          niveau: student.niveau,
          email: student.email
        }); // Fill the form with existing student data
      },
      error => {
        console.error('Error loading student data:', error);
        // Handle errors such as if the student does not exist
      }
    );
  }

  // Cancel function to navigate back to the student list
  annuler(): void {
    console.log('Navigating to student route');
    this.router.navigate(['/main/student']);
  }

  // Function to submit the form
  onSubmit(): void {
    if (this.studentForm.invalid) {
      return; // Don't submit if the form is invalid
    }

    const studentData = this.studentForm.value;
    // Prepare data before submitting to match API expectations
    studentData.specialite = { id: studentData.specialite }; // Wrap specialite id in an object

    if (this.isEditing) {
      // Update student if editing
      this.studentService.updateStudent(this.studentId!, studentData).subscribe(
        () => {
          this.router.navigate(['/main/student']); // Redirect to the student list after update
        },
        error => {
          console.error('Error updating student:', error);
          // Handle update errors
        }
      );
    } else {
      // Add new student if not editing
      this.studentService.addStudent(studentData).subscribe(
        () => {
          this.router.navigate(['/main/student']); // Redirect after adding the student
        },
        error => {
          console.error('Error adding student:', error);
          // Handle add errors
        }
      );
    }
  }

  // Getter methods for form controls
  get nom() {
    return this.studentForm.get('nom');
  }

  get prenom() {
    return this.studentForm.get('prenom');
  }

  get specialite() {
    return this.studentForm.get('specialite');
  }

  get niveau() {
    return this.studentForm.get('niveau');
  }

  get email() {
    return this.studentForm.get('email');
  }

  // Setter methods for form controls (optional, for setting values programmatically)
  setNom(value: string) {
    this.nom?.setValue(value);
  }

  setPrenom(value: string) {
    this.prenom?.setValue(value);
  }

  setSpecialite(value: string) {
    this.specialite?.setValue(value);
  }

  setNiveau(value: string) {
    this.niveau?.setValue(value);
  }

  setEmail(value: string) {
    this.email?.setValue(value);
  }
}
