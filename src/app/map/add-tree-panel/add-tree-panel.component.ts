import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapDataService } from '../../services/map-data.service';

import { yearValidator, zurichLatitudeValidator, zurichLongitudeValidator } from '../../shared/validators.directive';

import { attr } from '../../tree';

import * as Point from 'esri/geometry/Point';
import * as Graphic from 'esri/Graphic';

@Component({
  selector: 'add-tree-panel',
  templateUrl: './add-tree-panel.component.html',
  styleUrls: ['./add-tree-panel.component.scss']
})
export class AddTreePanelComponent implements OnInit {

  locationFormGroup: FormGroup;
  attributeFormGroup: FormGroup;
  treeNames: string[];
  quartiers: string[];

  constructor(private mapDataService: MapDataService) {

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
    console.log("group: !!!!", this.attributeFormGroup);

    // add the coordinates to the form
    this.mapDataService.mapEvent$.subscribe(value => {
      this.locationFormGroup.patchValue({
        'latitude': value.latitude,
        'longitude': value.longitude
      });
    });
  }

  saveTree() {
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
    newTree.attributes[attr.pflanzJahr] = attributes.pflanzJahr;
    newTree.attributes[attr.quartier] = attributes.quartier;
    this.mapDataService.addTree(newTree);
  }




}
