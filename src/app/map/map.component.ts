import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';

import MapView = require('esri/views/MapView');
import * as FeatureLayer from 'esri/layers/FeatureLayer';
import * as SimpleRenderer from 'esri/renderers/SimpleRenderer';
import * as PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import * as Locator from 'esri/tasks/Locator';
import { TreeService } from '../tree.service';
import { attributeNames, MapClickEvent } from '../tree';
import * as firebase from 'firebase';
import { MapEventService } from '../services/map-event.service';


@Component({
  selector: 'esri-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Output()
  viewCreated = new EventEmitter();
  @Output()
  clicked: EventEmitter<MapClickEvent> = new EventEmitter<MapClickEvent>();

  private mapView: MapView;
  private treeLayer: FeatureLayer;

  // this is needed to be able to create the MapView at the DOM element in this component
 // @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private mapService: MapService,
              private elementRef: ElementRef,
              private treeService: TreeService,
              private mapEventService: MapEventService) { }

  ngOnInit() {

    var map = this.mapService.map;

    const mapViewProperties: any = {
      container: this.elementRef.nativeElement.firstChild,
      map
    }
    this.mapView = new MapView(mapViewProperties);


     /*  // Create a locator task using the world geocoding service
      let locatorTask = new Locator({
        url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
      }); */


      let view = this.mapView;
      let clickEvent = new MapClickEvent();
      // let clickEventEmitter = this.clicked;
      let mapEventService = this.mapEventService;
      view.on("click", function (event) {

      // })
      // view.on("click", function (event) {
        event.stopPropagation();
        // console.log(event);
        // hier kriegt man die Koordinaten in event.mapPoint

        view.hitTest(event).then(function(response) {
          // console.log(response);
          if (response.results.length>0){
            let result = response.results[0];
            clickEvent.attr = result.graphic.attributes;
          }else{
            clickEvent.attr = null;
          }
          clickEvent.lat = event.mapPoint.latitude;
          clickEvent.lon = event.mapPoint.longitude;
          // clickEventEmitter.emit(clickEvent);
          mapEventService.emitMapEvent(clickEvent);
          // hier kriegt man die Objekten die geklickt wurden im response.results
        });

      /*   // Get the coordinates of the click on the view
        // around the decimals to 3 decimals
        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

        view.popup.open({
          // Set the popup's title to the coordinates of the clicked location
          title: "Reverse geocode: [" + lon + ", " + lat + "]",
          location: event.mapPoint // Set the location of the popup to the clicked location
        });

        // Execute a reverse geocode using the clicked location
        locatorTask.locationToAddress(event.mapPoint).then(function (response) {
          // If an address is successfully found, show it in the popup's content
          view.popup.content = response.address;
        }).otherwise(function (err) {
          // If the promise fails and no result is found, show a generic message
          view.popup.content = "No address was found for this location";
        }); */

      });

    this.treeService.dataLoaded.subscribe(() => {
      let layer = this.createLayer(this.treeService.trees);
      // console.log(this.treeService.trees);
      map.add(layer);
    })

    this.viewCreated.next(this.mapView);
  }

  createLayer(graphics) {
    let pTemplate = {
      title: "{title}",
      content: [{
        type: "fields",
        fieldInfos: attributeNames
      }]
    };
    let fields = attributeNames.map(attribute => {
      return {
        name: attribute.fieldName,
        alias: attribute.label,
        type: attribute.type
      }
    });
    let treesLayer = new FeatureLayer({
      source: graphics,
      fields: fields,
      objectIdField: "ObjectID",
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
      geometryType: "point",
      popupTemplate: pTemplate
    });

    return treesLayer;
  }
}
