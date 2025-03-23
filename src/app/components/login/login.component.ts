import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };
    console.log('Login Attempt:', credentials);

    this.authService.login(credentials).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login Error:', error);
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}
