import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { CampaignManagementComponent} from './campaign-management/campaign/campaign-management.component';
import {InfoAccountComponent} from './info-account/info-account.component';
import {LoginComponent} from "./user/login/login.component";
import {CreateCampaignComponent} from './campaign-management/create-campaign/create-campaign.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./user/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./user/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'campaign-management',
    loadComponent: () => import('./campaign-management/campaign/campaign-management.component').then(m => m.CampaignManagementComponent),
  },
  {
    path: 'info-account',
    loadComponent: () => import('./info-account/info-account.component').then(m => m.InfoAccountComponent),
  },
  {
    path: 'create-campaign',
    loadComponent: () => import('./campaign-management/create-campaign/create-campaign.component').then(m => m.CreateCampaignComponent),
  },
];
