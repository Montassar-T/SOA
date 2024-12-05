import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GererEtudiantComponent } from './components/gerer-etudiant/gerer-etudiant.component';
import { RedirectLoginGuard } from './guards/redirect-login.guard';
import { GererAbsenceComponent } from './components/gerer-absence/gerer-absence.component';
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'login', component: LoginComponent,canActivate: [RedirectLoginGuard], },
  {
    path: 'main',
    component: MainLayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Automatically redirect to /main/dashboard
      { path: 'dashboard', component: DashboardComponent },
      { path: 'student', component: EtudiantComponent },
      { path: 'absence', component: AbsenceComponent },
      { path: 'gerer-etudiant', component: GererEtudiantComponent }, // For adding a new student
      { path: 'gerer-etudiant/:id', component: GererEtudiantComponent }, // For adding a new student
      { path: 'gerer-absence', component: GererAbsenceComponent }, // For editing an existing student
      { path: 'gerer-absence/:id', component: GererAbsenceComponent }, // For editing an existing student


    ],
  },
  { path: '**', redirectTo: 'login' }, // Wildcard for undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
