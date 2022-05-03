import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const user = this.authService.currentUserValue;

    if (user) {
      switch (user.role) {
        case 'tecnico': {
          if (route.url[0].path !== 'interventi') {
            this.router.navigate(['/pages/interventi/assistenza/browse']);
          }
          return true;
        }
      }
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
}
