import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserSpaceModule } from './pages/user-space/user-space.module';

const appRoutes: Routes = [
  { path: 'user-space', loadChildren: () => import('./pages/user-space/user-space.module').then(m => m.UserSpaceModule) },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    UserSpaceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
