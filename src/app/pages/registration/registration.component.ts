import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})

export class RegistrationComponent {

  myForm: FormGroup = new FormGroup({
    'userName': new FormControl("", Validators.required),
    'userEmail': new FormControl("", [Validators.required, Validators.email]),
    'userPassword': new FormControl("", [Validators.required, Validators.minLength(6)]),
    'userRepeatPassword': new FormControl("", [Validators.required, this.userRepeatPasswordValidator.bind(this)]),
  })

  userRepeatPasswordValidator(control: FormControl): { [s: string]: boolean } | null {
    debugger;
    if (control.value !== this.myForm.get('userPassword')?.value) {
      return { 'userRepeatPassword': true }
    }
    return null;
  }

  submit() {
    console.log(this.myForm.get('userPassword')?.value)
  }
}
