import {GuessPanelComponent} from "./guess-panel.component";
import { TestBed, async, inject } from '@angular/core/testing';
import { MapDataService } from '../../services/map-data.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';
import { AppStateService } from '../../services/app-state.service';
import { Tree } from '../../tree';

describe('GuessPanelComponent', () => {

  let mapDataService: MapDataService;
  let db: AngularFireDatabase;
  let aS: AuthService;
  let appState: AppStateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MapDataService, AngularFireDatabase, AuthService, AppStateService]
    });
  }));


  it('initalisierung von #points', () => {
    const comp = new GuessPanelComponent(mapDataService, db, aS, appState);
    expect(comp.points).toEqual(0);
  });

  it('Rückgaben von getScore()', () => {
    const comp = new GuessPanelComponent(mapDataService, db, aS, appState);
    comp.dayScore = 10;
    expect(comp.getScore("day")).toEqual(10);

  });


// Folgende Tests funktionieren leider (noch) nicht


  // it('bei falscher auswahl einen punkt abzug', async(
  //   inject([ AuthService ], (service: AuthService) => {
  //
  //     const comp = new GuessPanelComponent(mapDataService, null, null, null);
  //     let tree: Tree;
  //     this.trio.attributes.baumnamede = "aaaaaa";
  //
  //     comp.selectedTree = this.tree;
  //     comp.initButtonState();
  //     comp.points = 1;
  //
  //     comp.selectTreeName("www", null);
  //     expect(comp.points).toEqual(0);
  //
  //   })));




  // it('setzten von dayscore bei guess', () => {
  //   const comp = new GuessPanelComponent(null, null, null, null);
  //   comp.updateGuess(3);
  //   comp.selectedTreeId = null;
  //   comp.selectedTreeName = null;
  //   comp.points = 0;
  //   comp.dayScoreRef$ = null;
  //   console.log(comp.dayScore);
  //   expect(comp.dayScore).toEqual(3);
  //
  // });

});
