import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  

  canActivate(route: ActivatedRouteSnapshot): boolean {
    

    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('token')) {
        // El usuario tiene un token, permitir la navegación
        return true;
      } else {
        // No hay token, redirigir al usuario a la página de login
        this.router.navigate(['/login']); // Asegúrate de cambiar '/login' por la ruta correcta
        return false;
      }
    } else {
      // LocalStorage no está disponible, redirigir al usuario
      this.router.navigate(['/login']); // Asegúrate de cambiar '/login' por la ruta correcta
      return false;
    }
  }
}
