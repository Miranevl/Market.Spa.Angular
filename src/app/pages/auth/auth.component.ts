import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private AuthService: AuthService) { }
  searchParams = new URLSearchParams(location.search);
  refreshTokenId = this.searchParams.get('token');

  isAuth = false;

  ngOnInit(): void {
    if (this.refreshTokenId) {
      this.AuthService.auth(this.refreshTokenId).subscribe(
        response => {
          this.isAuth = true;
          window.localStorage.setItem('token', response.data.token);
        },
        error => {
          this.isAuth = false;
          alert(error.error.details);
        }
      )

    }
  }
}
