import {GuessPanelComponent} from "./guess-panel.component";

describe('GuessPanelComponent', () => {
  it('initalisierung von #points', () => {
    const comp = new GuessPanelComponent(null, null, null, null);
    expect(comp.points).toEqual(0);
  });

  it('bei falscher auswahl einen punkt abzug', () => {
    const comp = new GuessPanelComponent(null, null, null, null);
    comp.selectedTree.attributes.baumnamedeu = "krawall";
    comp.points = 1;
    comp.selectTreeName("www");
    expect(comp.points).toEqual(0);

  });


  it('Rückgaben von getScore()', () => {
    const comp = new GuessPanelComponent(null, null, null, null);
    comp.dayScore = 10;
    expect(comp.getScore("day")).toEqual(10);

  });

  it('setzten von dayscore bei guess', () => {
    const comp = new GuessPanelComponent(null, null, null, null);
    comp.updateGuess(3);
    comp.selectedTreeId = null;
    comp.selectedTreeName = null;
    comp.points = 0;
    comp.dayScoreRef$ = null;
    console.log(comp.dayScore);
    expect(comp.dayScore).toEqual(3);

  });

});
