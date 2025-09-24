// src/app/profile/profile.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = null;
  userPosts: any[] = [];
  
  isEditing: boolean = false;
  editingPost: any = null;
  editedContent: string = '';

  // --- NOVAS VARIÁVEIS PARA AS LISTAS
  followers: any[] = [];
  following: any[] = [];
  showFollowers: boolean = false;
  showFollowing: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.apiService.get('profile').subscribe({
      next: (response) => {
        this.user = response;
        console.log('Dados do usuário carregados:', this.user);
        this.loadUserPosts(this.user.id);
        this.loadFollowers(this.user.id);
        this.loadFollowing(this.user.id);
      },
      error: (error) => {
        console.error('Erro ao carregar perfil:', error);
      },
    });
  }

  loadUserPosts(userId: number) {
    this.apiService.get(`user/${userId}/posts`).subscribe({
      next: (response) => {
        this.userPosts = response;
        console.log('Postagens do usuário carregadas:', this.userPosts);
      },
      error: (error) => {
        console.error('Erro ao carregar posts do usuário:', error);
      },
    });
  }

  logout() {
    // ... (Seu método de logout existente)
  }

  deletePost(postId: number) {
    // ... (Seu método de exclusão existente)
  }

  startEditing(post: any) {
    // ... (Seu método de edição existente)
  }

  cancelEditing() {
    // ... (Seu método de edição existente)
  }

  saveChanges() {
    // ... (Seu método de edição existente)
  }

  // --- NOVOS MÉTODOS PARA SEGUIR/DEIXAR DE SEGUIR
  followUser(userId: number) {
    // ... (Seu método de seguir existente)
  }

  unfollowUser(userId: number) {
    // ... (Seu método de deixar de seguir existente)
  }

  // --- NOVOS MÉTODOS PARA CARREGAR AS LISTAS
  loadFollowers(userId: number) {
    this.apiService.get(`users/${userId}/followers`).subscribe({
      next: (response) => {
        this.followers = response.followers; // Assumindo que sua API retorna uma lista
      },
      error: (error) => {
        console.error('Erro ao carregar seguidores:', error);
      }
    });
  }

  loadFollowing(userId: number) {
    this.apiService.get(`users/${userId}/following`).subscribe({
      next: (response) => {
        this.following = response.following; // Assumindo que sua API retorna uma lista
      },
      error: (error) => {
        console.error('Erro ao carregar quem o usuário segue:', error);
      }
    });
  }

  toggleFollowersList() {
    this.showFollowers = !this.showFollowers;
    this.showFollowing = false; // Fecha a outra lista
  }

  toggleFollowingList() {
    this.showFollowing = !this.showFollowing;
    this.showFollowers = false; // Fecha a outra lista
  }
}