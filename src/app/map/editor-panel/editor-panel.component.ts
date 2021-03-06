import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { yearValidator } from '../../shared/validators.directive';

import { MapDataService } from '../../services/map-data.service';
import { AppStateService } from '../../services/app-state.service';
import { attr } from '../../shared/tree';

@Component({
  selector: 'editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnChanges {

  form: FormGroup;
  loading: Boolean = false;
  treeNames;
  quartiers;

  @Input() selectedTree;
  @Output() editing: EventEmitter<boolean> = new EventEmitter();

  constructor(private appState: AppStateService,
    private mapDataService: MapDataService,
    private snackBar: MatSnackBar) {

      this.treeNames = mapDataService.uniqueTreeNames;
      this.quartiers = mapDataService.uniqueQuartiers;
    }

  ngOnChanges() {
    const attributes = this.selectedTree.attributes;
    this.form = new FormGroup({
      name: new FormControl(attributes[attr.nameDE], [Validators.required]),
      quartier: new FormControl(attributes[attr.quartier], [Validators.required]),
      pflanzJahr: new FormControl(attributes[attr.pflanzJahr], [yearValidator()])
    });
  }

  onSubmit(form) {

    this.loading = true;

    const editedTree = this.selectedTree;

    editedTree.attributes[attr.nameDE] = form.name;
    editedTree.attributes[attr.nameLat] = this.mapDataService.treeNamesMapping[form.name].nameLat;
    editedTree.attributes[attr.pflanzJahr] = form.pflanzJahr;
    editedTree.attributes[attr.quartier] = form.quartier;

    this.mapDataService.updateTree(editedTree)
      .then((tree) => {
        this.loading = false;
        this.editing.emit(false);
        this.snackBar.open('Baum erfolgreich aktualisiert', null, {
          duration: 5000,
        });
      }).otherwise((err) => {
        this.loading = false;
        this.snackBar.open(`Ein Fehler ist aufgetreten: ${err.message}`, null, {
          duration: 5000,
        });
      });
  }

  cancelEdit() {
    this.editing.emit(false);
  }

  deleteTree() {
    this.mapDataService.deleteTree(this.selectedTree)
      .then(tree => {
        this.selectedTree = null;
        this.appState.setInteraction('none');
        this.snackBar.open('Baum erfolgreich gelöscht', null, {
          duration: 5000,
        });
      })
      .otherwise((err) => {
        this.snackBar.open(`Ein Fehler ist aufgetreten: ${err.message}`, null, {
          duration: 5000,
        });
      });
  }

}
