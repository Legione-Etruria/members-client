import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TailwindFormsModule } from '../tailwind-forms/tailwind-forms.module';
import { AuthRoutingModule } from './auth-routing.module';
import { BackToLoginButtonComponent } from './components/back-to-login-button/back-to-login-button.component';
import { ForgotPasswordButtonComponent } from './components/forgot-password-button/forgot-password-button.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { TecnicoGuard } from './guards/tecnico.guard';
import { UserGuard } from './guards/user.guard';
import { VerifyGuard } from './guards/verify.guard';
import { AuthErrorInterceptor } from './interceptors/auth-error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    BackToLoginButtonComponent,
    ForgotPasswordButtonComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    TailwindFormsModule,
  ],
  exports: [SigninComponent, SignupComponent, BackToLoginButtonComponent],
  providers: [
    AuthService,
    VerifyGuard,
    AuthGuard,
    TecnicoGuard,
    ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    AdminGuard,
    UserGuard,
  ],
})
export class AuthModule {}
