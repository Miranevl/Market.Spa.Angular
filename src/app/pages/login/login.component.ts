import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  loginForm: any = {
    login: '',
    password: '',
  };

  onLoginSubmit() {
    const { login, password } = this.loginForm;
    this.authService.login(login, password).subscribe(
      responese => {
        console.log('вы успешно вошли');
      },
      error => {
        console.log('Миша все хуйня')
      }
    )
  }

}
