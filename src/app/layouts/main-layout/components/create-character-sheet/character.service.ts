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
    const url = `${CharacterService.URL_BACKGROUND}/getBackgrounds`;
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

  createCharacter(characterData: {id: number;idCampaign: number; strength: number; dexterity: number;
    constitution: number; intelligence: number; wisdom: number; charisma: number; level: number; xp: number;
    proficiency: number; ac : number; hitPointsMax: number; hitPointsCurrent: number; hitPointsTemp: number;
    hitDiceMax: number; hitDiceCurrent: number; deathSaveSuccess: number; deathSaveFailed: number;
    initiative: number; speed: number; passivePerception: number; athletics:boolean; acrobatics:boolean;
    sleightOfHand:boolean; stealth:boolean; arcana:boolean; history:boolean; investigation:boolean;
    nature:boolean; religion:boolean; animalHandling:boolean; insight:boolean; medicine:boolean;
    perception:boolean; survival:boolean; deception:boolean; intimidation:boolean; performance:boolean;
    persuasion:boolean; heroicInspiration:boolean; armorTraining:string; size:string; name:string;  race:string;
    class:string; subclass:string; background:string;}): Observable<any>  {

      const url = `${CharacterService.URL_NEWCHARACTER}/characterSheets`;
      return this._http.post<any>(url,characterData); // Envoie la fiche
  }

}
