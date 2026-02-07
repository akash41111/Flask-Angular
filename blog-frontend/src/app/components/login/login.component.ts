import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h2>Admin Login</h2>
      <input [(ngModel)]="username" placeholder="Username" type="text" />
      <input [(ngModel)]="password" placeholder="Password" type="password" />
      <button (click)="login()">Sign In</button>
      @if (error()) { <p class="error">{{ error() }}</p> }
    </div>
  `,
  styles: `.login-container { max-width: 300px; margin: 50px auto; display: flex; flex-direction: column; gap: 10px; }`
})
export class LoginComponent {
  username = '';
  password = '';
  error = signal('');
  
  private http = inject(HttpClient);
  private router = inject(Router);

  login() {
    this.http.post<{access_token: string}>('http://127.0.0.1:5000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/admin']);
      },
      error: () => this.error.set('Login Failed. Check your credentials.')
    });
  }
}