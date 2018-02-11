import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { MapDataService } from '../../services/map-data.service';
import { attr } from '../../tree';

@Component({
  selector: 'editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnInit {

  form: FormGroup;

  @Input() selectedTree;
  @Output() editing: EventEmitter<boolean> = new EventEmitter();

  constructor(private mapDataService: MapDataService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    let attributes = this.selectedTree.attributes;
    this.form = new FormGroup({
      quartier: new FormControl(attributes[attr.quartier]),
      status: new FormControl(attributes[attr.status]),
      pflanzJahr: new FormControl(attributes[attr.pflanzJahr])
    });
  }

  onSubmit(form) {

    let editedTree = this.selectedTree;

    editedTree.attributes[attr.pflanzJahr] = form.pflanzJahr;

    this.mapDataService.updateTree(editedTree)
      .then((tree) => {
        this.editing.emit(false);
        this.snackBar.open('Baum Attributen erfolgreich gespeichert.', null, {
          duration: 2000,
        });
      }).otherwise((err) => {
        this.snackBar.open('Ein Fehler ist aufgetretten.', null, {
          duration: 2000,
        });
      });
  }

  cancelEdit() {
    this.editing.emit(false);
  }

}
