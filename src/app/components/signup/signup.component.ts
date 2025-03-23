import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup({ username: this.username, email: this.email, password: this.password }).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/']);
      },
      error => this.errorMessage = 'Signup failed'
    );
  }
}