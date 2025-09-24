// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  newPostContent: string = '';
  commentContent: string = '';
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.apiService.get('posts').subscribe({
      next: (response) => {
        this.posts = response;
        this.filteredPosts = this.posts;
        console.log('Postagens carregadas com sucesso!', this.posts);
      },
      error: (error) => {
        console.error('Erro ao carregar posts:', error);
      },
    });
  }

  filterPosts() {
    // ... (Método de pesquisa, sem mudanças)
  }

  createPost() {
    // ... (Método de criar post, sem mudanças)
  }

  toggleLike(post: any) {
    // ... (Método de curtir/descurtir, sem mudanças)
  }

  // --- NOVO MÉTODO OTIMIZADO: Lógica para enviar um comentário
  submitComment(post: any, content: string) {
    if (content.trim()) {
      const commentData = { content: content, post_id: post.id };
      this.apiService.post('comments', commentData).subscribe({
        next: (response) => {
          console.log('Comentário adicionado com sucesso!', response);
          
          // Adiciona o comentário diretamente no post correspondente
          if (!post.comments) {
            post.comments = [];
          }
          post.comments.push(response); // Adiciona o novo comentário ao array

          // Limpa o campo do comentário
          post.newComment = ''; 
        },
        error: (error) => {
          console.error('Erro ao adicionar comentário:', error);
        },
      });
    }
  }
}