import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

// components
import { EditorPanelComponent } from './editor-panel.component';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { SortAlphabeticalPipe } from '../../shared/sort-alphabetical.pipe';

// services
import { AuthService} from '../../services/auth.service';
import { MapDataService } from '../../services/map-data.service';
import { AppStateService } from '../../services/app-state.service';

import { attr } from '../../shared/tree';

import { MockState } from '../../shared/MockState';


describe('EditorPanelComponent', () => {
  let component: EditorPanelComponent;
  let fixture: ComponentFixture<EditorPanelComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        // modules, everything declared here and under declarations may be used in component templates
        ReactiveFormsModule,
        MaterialModule
      ],
      declarations: [
        // declarables: directives (Attribute, Structural), components, pipes.
        EditorPanelComponent,
        LoadingPageComponent,
        SortAlphabeticalPipe
      ],
      providers: [
        MapDataService,
        {provide: AppStateService, useClass: MockState}
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(EditorPanelComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    inject([MapDataService, AppStateService], (
      mapDataService: MapDataService, appStateService: AppStateService) => {
      let nameDE = attr['nameDE'];
      component.selectedTree = {
        nameDE: 'hello world'
      }
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component).toBeTruthy();
    })
  });

  it('should update form ', () => {
    inject([MapDataService, AppStateService], (
      mapDataService: MapDataService, appStateService: AppStateService) => {
      let nameDE = attr['nameDE'];
      component.selectedTree = {
        nameDE: 'Salcie'
      }
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component.form.controls['name']).toEqual('Salcie');
    })
  });
});
