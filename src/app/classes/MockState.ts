import { HostListener, Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Tree } from '../tree';

type interactionType = 'none' | 'guess' | 'edit' | 'add' | 'view';
type modeType = 'game' | 'editor' | 'dashboard';

const USER = {
  id: '1234gfhj',
  email: 'hello@mail.com',
  roles: {
    user: true,
    superuser: false,
    admin: false
  }
};


export class MockState {


  public showMap: string = 'hide';
  public sidePanelPosition: string  = '';

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


  constructor() {
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

  userIsLoggedIn(): boolean{
    if (USER) {
      return true;
    }
    else {
      return false;
    }
  }

  userHasRole(role: string){
    return USER.roles[role];
  }

  setMode(mode: modeType) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.modeSource.next(mode);
    }
  }

  getMode(): modeType {
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