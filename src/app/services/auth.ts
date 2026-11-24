import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../models/authentication';
import { Credentials } from '../models/credentials';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
class Auth {
  private httpClient = inject(HttpClient);

  login(credenciais: Credentials):Observable<Authentication>{
     return this.httpClient.post<Authentication>('http://localhost:3000/login', credenciais)
      .pipe(
        tap((response) => {
          if (response && response.accessToken){
            sessionStorage.setItem('token', response.accessToken)
          }
        })
      );
  }

  isAuthenticated(): boolean{
    const token = sessionStorage.getItem('token');
    if(!token){
      return false;
    } else {
      return true;
    }
  }

  getToken():string{
    const token = sessionStorage.getItem('token');
    if (!token) {
      return '';
    } else {
      return token;
    }
  }

  logout(){
    sessionStorage.removeItem('token')
  }

}

export default Auth;
