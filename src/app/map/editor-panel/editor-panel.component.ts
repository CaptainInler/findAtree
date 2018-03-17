import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  treeNames;

  @Input() selectedTree;
  @Output() editing: EventEmitter<boolean> = new EventEmitter();

  constructor(private mapDataService: MapDataService,
    private snackBar: MatSnackBar) {

      this.treeNames = mapDataService.uniqueTreeNames;
    }

  ngOnInit() {

    const attributes = this.selectedTree.attributes;
    this.form = new FormGroup({
      name: new FormControl(attributes[attr.nameDE], [Validators.required]),
      quartier: new FormControl(attributes[attr.quartier], [
        Validators.required
      ]),
      status: new FormControl(attributes[attr.status]),
      pflanzJahr: new FormControl(attributes[attr.pflanzJahr])
    });
  }

  onSubmit(form) {

    const editedTree = this.selectedTree;

    editedTree.attributes[attr.nameDE] = form.name;
    editedTree.attributes[attr.pflanzJahr] = form.pflanzJahr;
    editedTree.attributes[attr.status] = form.status;
    editedTree.attributes[attr.quartier] = form.quartier;

    this.mapDataService.updateTree(editedTree)
      .then((tree) => {
        this.editing.emit(false);
        this.snackBar.open('Tree was succesfully updated', null, {
          duration: 5000,
        });
      }).otherwise((err) => {
        console.log(err);
        this.snackBar.open('An error was encountered.', null, {
          duration: 5000,
        });
      });
  }

  cancelEdit() {
    this.editing.emit(false);
  }

}
