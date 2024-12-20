import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private static URL_WEAPON:string = 'http://localhost:5277/weapons';
  private static URL_BACKGROUND:string = 'http://localhost:5277/backgrounds';
  private static URL_CLASS:string = 'http://localhost:5277/classes';
  private static URL_SUBCLASS:string = 'http://localhost:5277/subclasses';
  private static URL_RACE:string = 'http://localhost:5277/races';
  private static URL_NEWCHARACTER:string = 'http://localhost:5277/controller';

  constructor(private _http:HttpClient) { }

  getWeapons(): Observable<any> {
    const url = `${CharacterService.URL_WEAPON}/getWeapons`;
    return this._http.get<any>(url); // Récupère les Weapons
  }

  getBackgrounds(): Observable<any> {
    const url = `${CharacterService.URL_BACKGROUND}/getBackground`;
    return this._http.get<any>(url); // Récupère les weapons
  }

  getClasses(): Observable<any> {
    const url = `${CharacterService.URL_CLASS}/getClasses`;
    return this._http.get<any>(url); // Récupère les classes
  }

  getSubclasses(): Observable<any> {
    const url = `${CharacterService.URL_SUBCLASS}/getSubclasses`;
    return this._http.get<any>(url); // Récupère les subclasses
  }

  getRaces(): Observable<any> {
    const url = `${CharacterService.URL_RACE}/getRaces`;
    return this._http.get<any>(url); // Récupère les races
  }

  createCharacter(characterData: any): Observable<any>  {

      const url = `http://localhost:5277/CreatecharacterSheets`;
      return this._http.post<any>(url,characterData); // Envoie la fiche
  }

}
