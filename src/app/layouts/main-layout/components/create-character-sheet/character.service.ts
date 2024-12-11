import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  createCharacter(campaignData: { name: string; accessibility: string }): Observable<any> | null {
    return null;
  }
}
