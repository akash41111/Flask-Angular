import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      <button (click)="logout()">Logout</button>
      <hr>
      <h3>Create New Post</h3>
      <input [(ngModel)]="title" placeholder="Post Title" />
      <textarea [(ngModel)]="content" placeholder="Write your story..." rows="10"></textarea>
      <button (click)="submitPost()">Publish Post</button>
    </div>
  `,
  styles: `.admin-container { max-width: 800px; margin: 0 auto; padding: 20px; } 
           input, textarea { width: 100%; margin-bottom: 10px; display: block; }`
})
export class AdminComponent {
  title = '';
  content = '';
  private http = inject(HttpClient);
  private router = inject(Router);

  submitPost() {
    this.http.post('http://127.0.0.1:5000/api/posts', {
      title: this.title,
      content: this.content
    }).subscribe(() => {
      alert('Post Published!');
      this.router.navigate(['/']);
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}