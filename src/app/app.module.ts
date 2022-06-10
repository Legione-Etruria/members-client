import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ApiHttpModule } from './api-http/api-http.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LegioneEtruriaModule } from './legione-etruria/legione-etruria.module';
import { TailwindDialogModule } from './tailwind-dialog/tailwind-dialog.module';
import { TailwindToastsModule } from './tailwind-toasts/tailwind-toasts.module';
import { UsersModule } from './users/users.module';

export const tokenGetter = () =>
  localStorage.getItem(environment.localStorageJWT);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LegioneEtruriaModule,
    ApiHttpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000', 'legione-etruria-api.herokuapp.com'],
      },
    }),
    TailwindToastsModule,
    TailwindDialogModule,
    BrowserAnimationsModule,
    UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
