import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const user = this.authService.currentUserValue;

    if (user) {
      // check if route is restricted by role
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(user.role) === -1
      ) {
        // role not authorised so redirect to home page

        this.router.navigate(['/']);
        return false;
      }

      if ('tecnico' === user.role && route.url[0].path.startsWith('home')) {
        console.log(route.url);
        this.router.navigate(['/pages/interventi/assistenza/browse']);
        return true;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/signin'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
