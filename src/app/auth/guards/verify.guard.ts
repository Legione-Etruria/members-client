import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const user = this.authService.currentUserValue;

    if (user?.active) {
      // // check if route is restricted by role
      // if (user.accountVerified === true) {
      //   this.router.navigate(['/tickets']);
      //   return false;
      // }

      return true;
    }

    this.router.navigate(['/inactive-account']);
    return false;
  }
}
