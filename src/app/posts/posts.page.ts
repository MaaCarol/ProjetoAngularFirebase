import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: any[] = [];
  newPost: any = {
    user_name: '', // será preenchido automaticamente
    description: '',
    content: '',
    picture: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.newPost.user_name = localStorage.getItem('user_name') || 'Anônimo';
    this.loadPosts();
  }

  loadPosts() {
    this.apiService.get('posts').subscribe((res: any) => this.posts = res);
  }

  addPost() {
    if (!this.newPost.content) return;

    this.apiService.post('posts', this.newPost).subscribe(() => {
      this.newPost.content = '';
      this.newPost.description = '';
      this.newPost.picture = '';
      this.loadPosts();
    });
  }
}