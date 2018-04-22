import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MapComponent} from './map/map.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AdminComponent} from './admin/admin.component';
import {AdminGuard} from './services/admin.guard';

export const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true, useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
