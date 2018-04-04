import { HostListener, Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService} from './auth.service';
import { Tree } from '../tree';

type interactionType = 'none' | 'guess' | 'edit' | 'add' | 'view';
type modeType = 'game' | 'editor' | 'dashboard';

@Injectable()
export class AppStateService {

  public showMap = 'hide';
  public sidePanelPosition  = '';

  // set the view here to get acces to it from everywhere
  public mapView = null;

  private mode: modeType;
  private modeSource = new Subject<modeType>();
  public modeChanged = this.modeSource.asObservable();

  public interaction: interactionType;
  private interactionSource = new Subject<interactionType>();
  public interactionChanged = this.interactionSource.asObservable();

  public selectedTree: Tree;
  private selectedTreeSource = new Subject<Tree>();
  public selectedTreeChanged = this.selectedTreeSource.asObservable();


  constructor(private _aS: AuthService) {
    this.mode = 'editor';
    this.interaction = 'none';
  }

  setInteraction(interaction: interactionType) {
    if (this.interaction !== interaction) {
      this.interaction = interaction;
      this.interactionSource.next(interaction);
    }
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
    if (this.mode !== mode) {
      this.mode = mode;
      this.modeSource.next(mode);
    }
  }

  getMode(): modeType {
    console.log('getMode');
    return this.mode;
  }

  setSelectedTree(tree: Tree) {
    this.selectedTree = tree;
    this.selectedTreeSource.next(tree);
  }

  getSelectedTree(): Tree {
    return this.selectedTree;
  }

}
