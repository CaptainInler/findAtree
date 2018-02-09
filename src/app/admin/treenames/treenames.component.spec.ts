import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreenamesComponent } from './treenames.component';

describe('TreenamesComponent', () => {
  let component: TreenamesComponent;
  let fixture: ComponentFixture<TreenamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreenamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreenamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
