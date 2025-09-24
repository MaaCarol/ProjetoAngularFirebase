import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Verifica se o token de autenticação existe no localStorage
    const authToken = localStorage.getItem('auth_token');

    // Se o token existir, permite a navegação
    if (authToken) {
      return true;
    }

    // Se o token NÃO existir, redireciona o usuário para a página de login
    return this.router.createUrlTree(['/login']);
  }
}