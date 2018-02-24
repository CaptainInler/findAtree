import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

type interactionType = 'none' | 'guess' | 'edit' | 'add' | 'view';
type modeType = 'game' | 'editor' | 'dashboard';

@Injectable()
export class AppStateService {

  private mode: modeType;
  private modeSource = new Subject<modeType>();
  public modeChanged = this.modeSource.asObservable();

  public interaction: interactionType;
  private interactionSource = new Subject<interactionType>();
  public interactionChanged = this.interactionSource.asObservable();

  constructor() {
    this.mode = 'editor';
    this.interaction = 'none';
  }

  setInteraction(interaction: interactionType) {
    this.interaction = interaction;
    this.interactionSource.next(interaction);
    console.log(this.interaction);
  }

  getInteraction(): interactionType {
    return this.interaction;
  }

  setMode(mode: modeType) {
    this.mode = mode;
    this.modeSource.next(mode);
    console.log(this.mode);
  }

  getMode(): modeType {
    return this.mode;
  }

}
