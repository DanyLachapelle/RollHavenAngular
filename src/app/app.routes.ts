import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { CampaignManagementComponent} from './campaign-management/campaign/campaign-management.component';
import {InfoAccountComponent} from './info-account/info-account.component';
import {LoginComponent} from "./user/login/login.component";
import {CreateCampaignComponent} from './campaign-management/create-campaign/create-campaign.component';
import {AppComponent} from './app.component';


export const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'login',
    loadComponent: () => import('./user/login/lazy/lazy.component').then(m => m.LazyLoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./user/register/lazy/lazy.component').then(m => m.LazyRegisterComponent),
  },
  { path: 'campaign-management', component: CampaignManagementComponent },
  { path: 'info-account', component: InfoAccountComponent },
  { path: 'create-campaign', component: CreateCampaignComponent },
];
