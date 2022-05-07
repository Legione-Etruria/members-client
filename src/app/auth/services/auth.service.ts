import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiHttpService } from 'src/app/api-http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  public userSubject!: BehaviorSubject<User | null>;

  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(
    private apiHttpService: ApiHttpService,
    private jwtHelperService: JwtHelperService
  ) {
    this.refreshUserSubject();
  }

  public refreshUserSubject() {
    if (
      localStorage.getItem(environment.localStorageJWT) &&
      this.jwtHelperService.isTokenExpired(
        localStorage.getItem(environment.localStorageJWT) || ''
      )
    ) {
      return this.signOut();
    }

    this.currentUserSubject = new BehaviorSubject<User>(
      this.jwtHelperService.decodeToken(
        localStorage.getItem(environment.localStorageJWT) || ''
      )
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signIn(email: string, password: string) {
    return this.apiHttpService
      .post<User>('/api/v1/users/signin', {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          localStorage.setItem(environment.localStorageJWT, user.token || '');
          this.refreshUserSubject();
          return user;
        })
      );
  }

  signUp(
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    battleName: string,
    figtMembership: string,
    legioMembershipDate: Date,
    legioMembershipSubscriptionCost: number
  ) {
    return this.apiHttpService.post<User>('/api/v1/users/signup', {
      email,
      password,
      role,
      firstName,
      lastName,
      battleName,
      figtMembership,
      legioMembershipDate,

      legioMembershipSubscriptionCost,
    });
  }

  signOut() {
    localStorage.clear();
    location.reload();
  }

  forgotPassword(email: string) {
    return this.apiHttpService.post('/api/v1/users/forgot-password', { email });
  }

  resetPassword(password: string, confirmPassword: string, token: string) {
    return this.apiHttpService.post('/api/v1/users/recover-account', {
      password,
      confirmPassword,
      token,
    });
  }

  public deleteUser(userId: string) {
    return this.apiHttpService.delete(`/api/v1/users/delete/${userId}`);
  }
}
