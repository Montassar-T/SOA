import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem("auth_token")
    
    // Si un token existe, l'ajouter aux en-têtes de la requête
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      return next.handle(cloned);
    }

    // Sinon, passer la requête sans modification
    return next.handle(req);
  }
}
