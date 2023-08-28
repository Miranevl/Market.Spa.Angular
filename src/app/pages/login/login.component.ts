import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})


export class LoginComponent {
  loginForm: any = {
    login: '',
    password: '',
  };

  printForm() {
    console.log(this.loginForm);
  }
}
