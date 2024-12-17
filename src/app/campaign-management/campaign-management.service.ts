import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Campaign} from './campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignManagementService {

  private static URL:string = 'http://localhost:5277/campaigns/Public';
  private static BASE_URL:string = 'http://localhost:5277/campaigns';
  private static URL_ID:string = 'http://localhost:5277/campaigns/id';
  constructor(private _http:HttpClient) { }

  getPublicCampaigns(): Observable<Campaign[]> {
    return this._http.get<Campaign[]>(CampaignManagementService.URL);
  }

  createCampaign(userId: number, campaignData: { name: string; accessibility: string}): Observable<any> {
    const url = `http://localhost:5277/api/users/${userId}/campaigns`;
    return this._http.post<any>(url, campaignData);
  }


  getCampaignById(id: number): Observable<any> {
    const url = `${CampaignManagementService.URL_ID}/${id}`; // Utilise BASE_URL pour construire l'URL
    return this._http.get<any>(url); // Récupère la campagne par ID
  }

  getUsersByCampaignId(campaignId: number): Observable<any[]> {
    // Utilisation de l'ID de la campagne pour obtenir les utilisateurs associés
    const url = `${CampaignManagementService.BASE_URL}/${campaignId}/user-campaigns`;
    return this._http.get<any[]>(url); // Retourne les utilisateurs associés à la campagne
  }

  addPlayerToCampaign(campaignId: number, userId: number): Observable<void> {
    const url = `http://localhost:5277/api/CampaignCommand/${campaignId}/addPlayer/${userId}`;
    return this._http.post<void>(url, null); // POST request without body
  }

  getYourCampaigns(userId: number): Observable<any[]> {
    return this._http.get<any[]>(`http://localhost:5277/users/${userId}/campaigns`);
  }

  joinCampaignByCode(invitationCode: string, userId: number): Observable<any> {
    // Appeler l'API pour rejoindre la campagne via le code d'invitation
    return this._http.post<any>(`http://localhost:5277/api/CampaignCommand/${invitationCode}/join/${userId}`,null);
  }

  leaveCampaign(campaignId: number, userId: number): Observable<void> {
    return this._http.delete<void>(`http://localhost:5277/api/CampaignCommand/${campaignId}/leave/${userId}`);
  }

  deleteCampaign(campaignId: number) {
    return this._http.delete<void>(`http://localhost:5277/api/CampaignCommand/campaigns/${campaignId}`);
  }
}
