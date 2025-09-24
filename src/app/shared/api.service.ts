import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers: this.getAuthHeaders() });
  }

  // O parâmetro 'requiresAuth' é opcional e tem o valor padrão 'true'.
  // Para registro e login, você passará 'false'.
  post(endpoint: string, data: any, requiresAuth = true): Observable<any> {
    let headers;
    if (requiresAuth) {
      headers = this.getAuthHeaders();
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, { headers: this.getAuthHeaders() });
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { headers: this.getAuthHeaders() });
  }
}