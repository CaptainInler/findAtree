import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MapClickEvent} from '../tree';
import { AuthService} from './auth.service';


@Injectable()
export class MapEventService {

  // Observable MapClickEvent source
  private mapEventSource = new Subject<MapClickEvent>();

  // Observable MapClickEvent stream
  mapEvent$ = this.mapEventSource.asObservable();

  // Service event command
  emitMapEvent(event: MapClickEvent){
    if (this._aS.isLoggedIn()) {
      this.mapEventSource.next(event);
    }
  }


  constructor(private _aS: AuthService){
  }

}
