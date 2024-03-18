import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard2 implements CanActivate {
  constructor(private router: Router) {}
  

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (typeof localStorage !== 'undefined') {
      if(localStorage.getItem('inicio')){
          return true;
      }
      
      else{return false;}
    }
    else{return false;}

  }
}