import { Component } from '@angular/core';
import { CrudService } from '../services/crud.service'; // Corrija o caminho, se necessário.
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: any={
    name:'',
    email:'',
    password: '',
    password_confirmation: '',
    
  }
  constructor(
    public apiService: ApiService
  ) {}
cadastrarUsuario(){
  this.apiService.post('usuario/registrar-se', this.usuario).subscribe(resp=>{
    console.log(resp)
  })
}
}
