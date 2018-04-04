import {GuessPanelComponent} from "./guess-panel.component";

import { MapDataService } from '../../services/map-data.service';
import { AngularFireDatabase} from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';
import { AppStateService } from '../../services/app-state.service';


describe('GuessPanelComponent', () => {

  let mapDataService: MapDataService;
  let db: AngularFireDatabase;
  let aS: AuthService;
  let appState: AppStateService;


  it('initalisierung von #points', () => {
    const comp = new GuessPanelComponent(mapDataService, db, aS, appState);
    expect(comp.points).toEqual(0);
  });

  it('Rückgaben von getScore()', () => {
    const comp = new GuessPanelComponent(mapDataService, db, aS, appState);
    comp.dayScore = 10;
    expect(comp.getScore("day")).toEqual(10);

  });
});
