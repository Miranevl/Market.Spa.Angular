import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: 'app',
    pathMatch: 'prefix',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/user-space/user-space.module').then(
        (m) => m.UserSpaceModule
      ),
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'registration', pathMatch: 'full', component: RegistrationComponent },
];

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
