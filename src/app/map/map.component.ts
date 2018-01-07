import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';

import MapView = require('esri/views/MapView');
import * as Point from 'esri/geometry/Point';
import * as SpatialReference from 'esri/geometry/SpatialReference';
import * as FeatureLayer from 'esri/layers/FeatureLayer';
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


/*    var lyr, legend;

    /!**************************************************
     * Define the specification for each field to create
     * in the layer
     **************************************************!/

    var fields = [
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

    // Set up popup template for the layer
    var pTemplate = {
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

    /!*******************************************
     * Define the renderer for symbolizing trees
     *******************************************!/

    var treesRenderer = {
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
      },
      visualVariables: [
        {
          type: "size",
          field: "mag", // earthquake magnitude
          valueUnit: "unknown",
          minDataValue: 2,
          maxDataValue: 7,
          // Define size of mag 2 quakes based on scale
          minSize: {
            type: "size",
            expression: "view.scale",
            stops: [
              {
                value: 1128,
                size: 12
              },
              {
                value: 36111,
                size: 12
              },
              {
                value: 9244649,
                size: 6
              },
              {
                value: 73957191,
                size: 4
              },
              {
                value: 591657528,
                size: 2
              }]
          },
          // Define size of mag 7 quakes based on scale
          maxSize: {
            type: "size",
            expression: "view.scale",
            stops: [
              {
                value: 1128,
                size: 80
              },
              {
                value: 36111,
                size: 60
              },
              {
                value: 9244649,
                size: 50
              },
              {
                value: 73957191,
                size: 50
              },
              {
                value: 591657528,
                size: 25
              }]
          }
        }]
    };


    // ????????????????????????????????????????????????????
    this.mapView.when(function() {
      // Request the earthquake data from USGS when the view resolves
      getData()
        .then(createGraphics) // then send it to the createGraphics() method
        .then(createLayer) // when graphics are created, create the layer
//        .then(createLegend) // when layer is created, create the legend
        .otherwise(errback);
    });

    // get trees
    function getData() {

      this.treeService.getTrees()
        .subscribe(trees => this.trees = trees );
    }


    /!**************************************************
     * Create graphics with returned geojson data
     **************************************************!/

    function createGraphics(response) {
      // raw GeoJSON data
      var geoJson = response.data;

      // Create an array of Graphics from each GeoJSON feature
      return geoJson.features.map(function(feature, i) {
        return {
          geometry: new Point({
            x: feature.geometry.coordinates[0],
            y: feature.geometry.coordinates[1]
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

    /!**************************************************
     * Create a FeatureLayer with the array of graphics
     **************************************************!/

    function createLayer(graphics) {

      lyr = new FeatureLayer({
        source: graphics, // autocast as an array of esri/Graphic
        // create an instance of esri/layers/support/Field for each field object
        fields: fields, // This is required when creating a layer from Graphics
        objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
        renderer: treesRenderer, // set the visualization on the layer
        spatialReference: {
          wkid: 4326
        },
        geometryType: "point", // Must be set when creating a layer from Graphics
        popupTemplate: pTemplate
      });

      map.add(lyr);
      return lyr;
    }

    // Executes if data retrieval was unsuccessful.
    function errback(error) {
      console.error("Creating legend failed. ", error);
    }*/


    this.viewCreated.next(this.mapView);
  }
}
