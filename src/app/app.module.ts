import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: 'app',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/user-space/user-space.module').then(
        (m) => m.UserSpaceModule
      ),
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'registration', pathMatch: 'full', component: RegistrationComponent },
  { path: 'auth', pathMatch: 'full', component: AuthComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrationComponent, AuthComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
