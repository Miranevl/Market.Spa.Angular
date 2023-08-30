import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  loginForm: any = {
    loginOrEmail: '',
    password: '',
  };

  onLoginSubmit() {
    const { loginOrEmail, password } = this.loginForm;
    this.authService.login(loginOrEmail, password).subscribe(
      responese => {
        alert('Вы успешно вошли!')
        window.localStorage.setItem('token', responese.data.token);
        this.router.navigate(['/app']);
      },
      error => {
        alert(error.error.details);
      }
    )
  }

}
