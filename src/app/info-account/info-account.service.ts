import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoAccountService {
  private static UPDATE_URL: string = 'http://localhost:5277/api/users/updateUser';

  constructor(private http: HttpClient) {}

  updateUser(userId:number,userData: any): Observable<any> {

    // Construire l'URL avec l'ID dans le chemin
    const url = `${InfoAccountService.UPDATE_URL}/${userId}`;

    // Effectuer la requête PUT avec l'URL et les données utilisateur
    return this.http.put(url, userData);
  }
}
