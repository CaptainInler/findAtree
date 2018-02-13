import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapDataService } from '../../services/map-data.service';

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
  treeNames;

  constructor(private _formBuilder: FormBuilder,
  private mapDataService: MapDataService) {

    this.treeNames = mapDataService.uniqueTreeNames;
  }

  ngOnInit() {

    this.locationFormGroup = this._formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });

    this.attributeFormGroup = this._formBuilder.group({
      nameDE: ['', Validators.required],
      pflanzJahr: ['', Validators.required],
      quartier: ['', Validators.required]
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
