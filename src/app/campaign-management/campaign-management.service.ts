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
  constructor(private _http:HttpClient) { }

  getPublicCampaigns(): Observable<Campaign[]> {
    return this._http.get<Campaign[]>(CampaignManagementService.URL);
  }

  createCampaign(campaignData: { name: string; accessibility: string }): Observable<any> {
    return this._http.post(`${CampaignManagementService.BASE_URL}`, campaignData);
  }
}
