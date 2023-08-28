import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginForm: any = {
    login: '',
    password: '',
  };

  async printForm() {
    console.log(this.loginForm);

    this.authService.login(this.loginForm.login, this.loginForm.password).subscribe((result)=>{
      console.log(result);
    });

  }
}
