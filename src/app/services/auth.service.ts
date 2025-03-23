import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private backendUrl = 'http://localhost:5001';

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: any) {
    return this.http.post(`${this.backendUrl}/users`, user);
  }

  login(user: any) {
    return this.http.post(`${this.backendUrl}/login`, user);
  }

  predict(data: any) {
    return this.http.post(`${this.backendUrl}/predict`, data);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
