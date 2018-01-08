import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';

import MapView = require('esri/views/MapView');
import * as Point from 'esri/geometry/Point';
import * as SpatialReference from 'esri/geometry/SpatialReference';
import * as FeatureLayer from 'esri/layers/FeatureLayer';
import * as SimpleRenderer from 'esri/renderers/SimpleRenderer';
import * as PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import { TreeService } from '../tree.service';
import { Tree } from '../tree';

@Component({
  selector: 'esri-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent {

  @Output()
  viewCreated = new EventEmitter();

  private mapView: MapView;
  private trees: Tree[];

  // this is needed to be able to create the MapView at the DOM element in this component
 // @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private mapService: MapService,
              private elementRef: ElementRef,
              private treeService: TreeService) { }

  ngOnInit() {

    var map = this.mapService.map;

    const mapViewProperties: any = {
     container: this.elementRef.nativeElement.firstChild,
      //     container: this.mapViewEl.nativeElement,
      map,
      center: new Point({
        x: 8.532,
        y: 47.381,
        spatialReference: new SpatialReference({ wkid: 4326 })
      }),
      zoom: 15
    }
    this.mapView = new MapView(mapViewProperties);

    // get trees

    this.treeService.getTrees()
      .subscribe(trees => {
        this.mapView.when(() => {
          let treeGraphics = this.createGraphics(trees);
          let layer = this.createLayer(treeGraphics);
          console.log(layer);
        });
      });


    this.viewCreated.next(this.mapView);
  }

  createGraphics(trees) {
    console.log(trees);
    // Create an array of Graphics from each tree feature
    return trees.map(function(feature, i) {
      return {
        geometry: new Point({
          x: feature.geometry.coordinates[0][0],
          y: feature.geometry.coordinates[0][1]
        }),
        // select only the attributes you care about
        attributes: {
          ObjectID: i,
          kategorie: feature.properties.kategorie,
          quartier: feature.properties.quartier,
          baumgattunglat: feature.properties.baumgattunglat,
          baumartlat: feature.properties.baumartlat,
          baumnamelat: feature.properties.baumnamelat,
          baumnamedeu: feature.properties.baumnamedeu,
          baumnummer: feature.properties.baumnummer,
          status: feature.properties.status,
          baumtyp: feature.properties.baumtyp,
          baumtyptext: feature.properties.baumtyptext,
          pflanzjahr: feature.properties.pflanzjahr,
          genauigkeit: feature.properties.genauigkeit
        }
      };
    });
  }

  createLayer(graphics) {
    let pTemplate = {
      title: "{title}",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "kategorie",
          label: "Kategorie",
          visible: true
        }, {
          fieldName: "quartier",
          label: "Quartier",
          visible: true
        }, {
          fieldName: "strasse",
          label: "Strasse",
          visible: true
        }, {
          fieldName: "baumgattunglat",
          label: "Gattung",
          visible: true
        }, {
          fieldName: "baumartlat",
          label: "Art",
          visible: true
        }, {
          fieldName: "baumnamelat",
          label: "Name",
          visible: true
        }, {
          fieldName: "baumnamedeu",
          label: "Name deu.",
          visible: true
        }, {
          fieldName: "baumnummer",
          label: "Nummer",
          visible: true
        }, {
          fieldName: "status",
          label: "Status",
          visible: true
        }, {
          fieldName: "baumtyp",
          label: "Typ",
          visible: true
        }, {
          fieldName: "bumtyptext",
          label: "Typ txt.",
          visible: true
        }, {
          fieldName: "pflanzjahr",
          label: "Planzjahr",
          visible: true,
          format: {
            digitSeparator: true,
            places: 0
          }
        }, {
          fieldName: "genauigkeit",
          label: "Genauigkeit",
          visible: true
        }]
      }],
      fieldInfos: [{
        fieldName: "time",
        format: {
          dateFormat: "short-date-short-time"
        }
      }]
    };
    let fields = [
      {
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }, {
        name: "kategorie",
        alias: "Kategorie",
        type: "string"
      }, {
        name: "quartier",
        alias: "Quartier",
        type: "string"
      }, {
        name: "strasse",
        alias: "Strasse",
        type: "string"
      }, {
        name: "baumgattunglat",
        alias: "Baumgattung lat.",
        type: "string"
      }, {
        name: "baumartlat",
        alias: "Baumart lat.",
        type: "string"
      }, {
        name: "baumnamelat",
        alias: "Baumname lat.",
        type: "string"
      }, {
        name: "baumnamedeu",
        alias: "Baumname deu.",
        type: "string"
      }, {
        name: "baumnummer",
        alias: "Baumnummer",
        type: "string"
      }, {
        name: "status",
        alias: "Status",
        type: "string"
      }, {
        name: "baumtyp",
        alias: "Baumtyp",
        type: "double"
      }, {
        name: "baumtyptext",
        alias: "Baumtyp txt.",
        type: "string"
      }, {
        name: "planzjahr",
        alias: "Planzjahr",
        type: "double"
      }, {
        name: "genauigkeit",
        alias: "Genauigkeit",
        type: "string"
      }];
    let treesRenderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        style: "circle",
        size: 20,
        color: [211, 255, 0, 0],
        outline: {
          width: 1,
          color: "#FF0055",
          style: "solid"
        }
      }
    };
    let treesLayer = new FeatureLayer({
      source: graphics, // autocast as an array of esri/Graphic
      // create an instance of esri/layers/support/Field for each field object
      fields: fields, // This is required when creating a layer from Graphics
      objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
      spatialReference: {
        wkid: 4326
      },
      renderer: new SimpleRenderer({
        symbol: new PictureMarkerSymbol({
          url: "./src/assets/images/tree.png",
          width: 15,
          height: 15
        })
      }),
      geometryType: "point", // Must be set when creating a layer from Graphics
      popupTemplate: pTemplate
    });

    this.mapService.map.add(treesLayer);
    return treesLayer;
  }
}
