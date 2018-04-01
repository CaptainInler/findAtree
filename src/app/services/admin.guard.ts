import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService} from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _as: AuthService, private router: Router){

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._as.hasRole('admin')){
      this.router.navigate(['/map']);
        return false;
    }
    return true;
  }
}
