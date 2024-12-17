import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static URL:string = 'http://localhost:5277/api/users';
  private static LOGIN_URL: string = 'http://localhost:5277/api/users/login';
  constructor(private _http:HttpClient) { }


  create(user:User):Observable<User> {
    return this._http.post<User>(UserService.URL,user);
  }

  login(loginData: { pseudo: string; password: string }): Observable<any> {
    return this._http.post<any>(UserService.LOGIN_URL, loginData);
  }

  setUserSession(response: any): void {
    // Sauvegarde du token et des détails de l'utilisateur dans localStorage
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
