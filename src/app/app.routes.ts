import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { CampaignManagementComponent} from './campaign-management/campaign-management.component';
import {InfoAccountComponent} from './info-account/info-account.component';
import {LoginComponent} from "./user/login/login.component";


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'campaign-management', component: CampaignManagementComponent },
  { path: 'info-account', component: InfoAccountComponent },
];
