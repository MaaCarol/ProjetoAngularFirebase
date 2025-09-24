// src/app/login/login.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  // Adicionando a variável para a mensagem de erro
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.errorMessage = ''; // Limpa a mensagem de erro a cada tentativa
    this.apiService.post('login', this.loginData).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('auth_token', response.token); 
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.error('Erro no login:', error);
        // Se a API retornar um erro de autenticação (geralmente 401),
        // mostramos uma mensagem amigável para o usuário
        if (error.status === 401) {
          this.errorMessage = 'E-mail ou senha inválidos. Por favor, tente novamente.';
        } else {
          this.errorMessage = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
        }
      },
    });
  }
}