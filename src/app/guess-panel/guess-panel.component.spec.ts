import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessPanelComponent } from './guess-panel.component';

describe('GuessPanelComponent', () => {
  let component: GuessPanelComponent;
  let fixture: ComponentFixture<GuessPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
