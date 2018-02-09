import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MapClickEvent} from '../tree';


@Injectable()
export class MapEventService {

  // Observable MapClickEvent source
  private mapEventSource = new Subject<MapClickEvent>();

  // Observable MapClickEvent stream
  mapEvent$ = this.mapEventSource.asObservable();

  // Service event command
  emitMapEvent(event: MapClickEvent){
    this.mapEventSource.next(event);
  }


  constructor() { }

}
