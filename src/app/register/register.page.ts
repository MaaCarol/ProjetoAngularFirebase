import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  usuario = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      console.log('Dados a serem enviados:', this.usuario); 
      this.apiService.post('register', this.usuario).subscribe({
        next: (resp) => {
          console.log('Cadastro realizado com sucesso!', resp);
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          alert('Erro ao cadastrar: ' + JSON.stringify(error.error));
        },
      });
    } else {
      console.log('Formulário inválido. Preencha todos os campos.');
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}