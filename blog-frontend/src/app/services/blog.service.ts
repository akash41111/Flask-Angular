import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:5000/api';
  
  // Use a Signal to store posts for global access
  posts = signal<Post[]>([]);

  fetchPosts() {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      tap(data => this.posts.set(data))
    ).subscribe();
  }
}