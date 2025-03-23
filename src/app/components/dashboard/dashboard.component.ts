import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent {
  // Retrieve the logged-in user info from localStorage (login response)
  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  // Prediction fields as expected by the backend
  prediction: any = {
    "Humidity": "",
    "Temperature": "",
    "pH": "",
    "Rainfall": "",
    "Leaf Damage (%)": "",
    "Larvae Presence": "",
    "Soil Type": "",
    "Season": ""
  };

  predictionResult: string = '';
  predictionError: string = '';

  // Combined history records from login response
  historyRecords: Array<{ date: string, status: string }> = [];

  get historyAvailable(): boolean {
    return this.historyRecords.length > 0;
  }

  constructor(private authService: AuthService, private router: Router) {
    // If the login response stored in localStorage contains history data,
    // combine the disease statuses and prediction dates into an array.
    if (this.user.diseasestatus && this.user.prediction_date &&
        Array.isArray(this.user.diseasestatus) && Array.isArray(this.user.prediction_date)) {
      for (let i = 0; i < this.user.diseasestatus.length; i++) {
        this.historyRecords.push({
          date: this.user.prediction_date[i],
          status: this.user.diseasestatus[i]
        });
      }
    }
  }

  predict() {
    // Create the payload including the logged-in user's email
    const payload = {
      email: this.user.email,
      ...this.prediction
    };

    this.authService.predict(payload).subscribe(
      (response: any) => {
        this.predictionResult = response.prediction;
        this.predictionError = '';

        // Update the prediction history with the new result
        const currentDate = new Date().toISOString();
        this.historyRecords.push({ date: currentDate, status: response.prediction });
      },
      error => {
        console.error('Prediction error:', error);
        this.predictionError = error.error?.error || 'Prediction failed';
        this.predictionResult = '';
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
