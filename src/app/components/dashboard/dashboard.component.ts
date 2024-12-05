import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalMonthlyAbsences: number = 0;
  todaysAbsences: number = 0;
  totalStudents: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    // Fetch total monthly absences
    this.dashboardService.getTotalMonthlyAbsences().subscribe({
      next: (data) => (this.totalMonthlyAbsences = data),
      error: (err) => console.error('Error fetching total monthly absences', err)
    });

    // Fetch today's absences
    this.dashboardService.getTodaysAbsences().subscribe({
      next: (data) => (this.todaysAbsences = data),
      error: (err) => console.error('Error fetching today\'s absences', err)
    });

    // Fetch total students
    this.dashboardService.getTotalStudents().subscribe({
      next: (data) => (this.totalStudents = data),
      error: (err) => console.error('Error fetching total students', err)
    });
  }
}
