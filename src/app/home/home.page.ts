import { Component } from '@angular/core';
import { CrudService } from '../services/crud.service'; // Corrija o caminho, se necessário.

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  clientes: any[] = [];

  constructor(public crudService: CrudService) {
    this.getClientes();
  }

  getClientes() {
    fetch('http://127.0.0.1:8000/api/clientes')
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.clientes = resp;
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }
}
