import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreePanelComponent } from './add-tree-panel.component';

describe('AddTreePanelComponent', () => {
  let component: AddTreePanelComponent;
  let fixture: ComponentFixture<AddTreePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTreePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTreePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
