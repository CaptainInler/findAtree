import { HostListener, Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService} from './auth.service';

type interactionType = 'none' | 'guess' | 'edit' | 'add' | 'view';
type modeType = 'game' | 'editor' | 'dashboard';

@Injectable()
export class AppStateService {

  public showMap = 'hide';
  public sidePanelPosition  = '';

  private mode: modeType;
  private modeSource = new Subject<modeType>();
  public modeChanged = this.modeSource.asObservable();

  public interaction: interactionType;
  private interactionSource = new Subject<interactionType>();
  public interactionChanged = this.interactionSource.asObservable();

  constructor(private _aS: AuthService) {
    this.mode = 'editor';
    this.interaction = 'none';
  }

  setInteraction(interaction: interactionType) {
    this.interaction = interaction;
    this.interactionSource.next(interaction);
  }

  getInteraction(): interactionType {
    return this.interaction;
  }

  userIsLoggedIn(): boolean {
    return this._aS.isLoggedIn();
  }

  userHasRole(role: string) {
    return this._aS.hasRole(role);
  }

  setMode(mode: modeType) {
    this.mode = mode;
    this.modeSource.next(mode);
  }

  getMode(): modeType {
    return this.mode;
  }

}
