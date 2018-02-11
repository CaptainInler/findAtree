import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-tree-panel',
  templateUrl: './add-tree-panel.component.html',
  styleUrls: ['./add-tree-panel.component.scss']
})
export class AddTreePanelComponent implements OnInit {

  locationFormGroup: FormGroup;
  attributeFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.locationFormGroup = this._formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });

    this.attributeFormGroup = this._formBuilder.group({
      quartier: ['', Validators.required]
    });
  }

}
