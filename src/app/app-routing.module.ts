import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { MapComponent} from './map/map.component';
import { MembersComponent} from './members/members.component';
import {LoginComponent} from './members/login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignupComponent} from './members/signup/signup.component';
import {EmailComponent} from './members/email/email.component';
import {AuthGuard} from './services/auth.guard';

export const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/signup', component: SignupComponent },
  { path: 'login/email', component: EmailComponent},
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{enableTracing: true, useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
