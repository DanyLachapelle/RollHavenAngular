import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { CampaignManagementComponent} from './campaign-management/campaign/campaign-management.component';
import {InfoAccountComponent} from './info-account/info-account.component';
import {LoginComponent} from "./user/login/login.component";
import {CreateCampaignComponent} from './campaign-management/create-campaign/create-campaign.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'campaign-management', component: CampaignManagementComponent },
  { path: 'info-account', component: InfoAccountComponent },
  {path: 'create-campaign', component: CreateCampaignComponent },
  { path: 'campaign/:id', component: MainLayoutComponent },
];
