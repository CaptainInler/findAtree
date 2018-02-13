import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapDataService } from '../../services/map-data.service';

@Component({
  selector: 'add-tree-panel',
  templateUrl: './add-tree-panel.component.html',
  styleUrls: ['./add-tree-panel.component.scss']
})
export class AddTreePanelComponent implements OnInit {

  locationFormGroup: FormGroup;
  attributeFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
  private mapDataService: MapDataService) { }

  ngOnInit() {
    this.locationFormGroup = this._formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });

    this.attributeFormGroup = this._formBuilder.group({
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




}
