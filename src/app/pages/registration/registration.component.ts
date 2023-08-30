import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})

export class RegistrationComponent {
  constructor(private AuthService: AuthService, private router: Router) { }
  myForm: FormGroup = new FormGroup({
    'userName': new FormControl("", Validators.required),
    'userEmail': new FormControl("", [Validators.required, Validators.email]),
    'userPassword': new FormControl("", [Validators.required, Validators.minLength(6)]),
    'userRepeatPassword': new FormControl("", [Validators.required, this.userRepeatPasswordValidator.bind(this)]),
  })

  userRepeatPasswordValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.myForm) {
      if (control.value !== this.myForm.get('userPassword')?.value) {
        return { 'userRepeatPassword': true }
      }
    }
    return null;
  }


  onRegistrationSubmit() {
    const { userName, userEmail, userPassword } = this.myForm.value;
    this.AuthService.registration(userName, userPassword, userEmail).subscribe(
      response => {
        alert('Вы успешно зарегистрированы!')
        alert('Вам на почту был отправлено подтверждение регистрации')
        this.router.navigate(['/login']);
      },
      error => {
        alert(error.error.details)
      }
    )
  }

}
