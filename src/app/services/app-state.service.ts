import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

type interactionType = 'none' | 'guess' | 'edit' | 'add' | 'view';

@Injectable()
export class AppStateService {

  public mode: 'game' | 'editor';
  private interaction: interactionType;
  private interactionSource = new Subject<interactionType>();
  public interactionChanged = this.interactionSource.asObservable();

  constructor() {
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

}
