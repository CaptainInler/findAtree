import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapDataService } from '../../services/map-data.service';
import { AppStateService } from '../../services/app-state.service';

import { yearValidator, zurichLatitudeValidator, zurichLongitudeValidator } from '../../shared/validators.directive';

import { attr } from '../../shared/tree';

import * as Point from 'esri/geometry/Point';
import * as Graphic from 'esri/Graphic';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'add-tree-panel',
  templateUrl: './add-tree-panel.component.html',
  styleUrls: ['./add-tree-panel.component.scss']
})
export class AddTreePanelComponent implements OnInit {

  locationFormGroup: FormGroup;
  attributeFormGroup: FormGroup;
  loading: Boolean = false;
  treeNames: string[];
  quartiers: string[];

  @Input() selectedTree;

  constructor(private appState: AppStateService,
    private mapDataService: MapDataService,
    private snackBar: MatSnackBar) {

    this.treeNames = mapDataService.uniqueTreeNames;
    this.quartiers = mapDataService.uniqueQuartiers;
  }

  ngOnInit() {

    this.locationFormGroup = new FormGroup({
      latitude: new FormControl('', [Validators.required, zurichLatitudeValidator()]),
      longitude: new FormControl('', [Validators.required, zurichLongitudeValidator()])
    });

    this.attributeFormGroup = new FormGroup({
      nameDE: new FormControl('', [Validators.required]),
      pflanzJahr: new FormControl('', [Validators.required, yearValidator()]),
      quartier: new FormControl('', [Validators.required])
    });

    // add the coordinates to the form
    this.mapDataService.mapEvent$.subscribe(value => {
      this.locationFormGroup.patchValue({
        'latitude': value.latitude,
        'longitude': value.longitude
      });
    });
  }

  saveTree() {
    this.loading = true;
    const attributes = this.attributeFormGroup.value;
    const newTree = new Graphic({
      geometry: new Point({
        spatialReference: {
          wkid: 4326
        },
        latitude: this.locationFormGroup.value.latitude,
        longitude: this.locationFormGroup.value.longitude
      }),
      attributes: {}
    });
    newTree.attributes[attr.nameDE] = attributes.nameDE;
    newTree.attributes[attr.nameLat] = this.mapDataService.treeNamesMapping[attributes.nameDE].nameLat;
    newTree.attributes[attr.pflanzJahr] = attributes.pflanzJahr;
    newTree.attributes[attr.quartier] = attributes.quartier;

    this.mapDataService.addTree(newTree)
      .then(result => {
        this.loading = false;
        newTree.attributes[attr.id] = result.addFeatureResults[0].objectId;
        this.appState.setSelectedTree(newTree);
        this.appState.setInteraction("view");
        this.snackBar.open('Baum erfolgreich hinzugefügt', null, {
          duration: 5000,
        });
      })
      .otherwise((err) => {
        this.loading = false;
        this.snackBar.open(`Ein Fehler ist aufgetreten: ${err.message}`, null, {
          duration: 5000,
        });
      });
  }




}
