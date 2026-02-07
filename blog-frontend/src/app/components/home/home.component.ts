import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Latest Stories</h1>
      <hr>
      @for (post of blogService.posts(); track post.id) {
        <article class="post-card">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <small>Posted on: {{ post.date_posted | date }}</small>
        </article>
      } @empty {
        <p>No posts yet. Check back later!</p>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .post-card { border-bottom: 1px solid #eee; padding: 1rem 0; }
  `]
})
export class HomeComponent implements OnInit {
  blogService = inject(BlogService);

  ngOnInit() {
    this.blogService.fetchPosts();
  }
}