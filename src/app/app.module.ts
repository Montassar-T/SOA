import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GererEtudiantComponent } from './components/gerer-etudiant/gerer-etudiant.component';
import { AuthInterceptor } from './auth.interceptor';
import { GererAbsenceComponent } from './components/gerer-absence/gerer-absence.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantComponent,
    AbsenceComponent,
    MainLayoutComponent,
    DashboardComponent,
    GererEtudiantComponent,
    GererAbsenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, // For HTTP requests
  ],
  providers: [
    provideHttpClient(withFetch()), // Enable fetch API for HttpClient
    provideClientHydration(),       // For server-side rendering (SSR)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,  // Cela permet d'ajouter plusieurs interceptors
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
