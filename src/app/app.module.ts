import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { TreeService } from './tree.service';
import { TreesComponent } from './trees/trees.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    // imports firebase/app needed for everything
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    TreesComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    MapService, TreeService
  ]
})
export class AppModule {}
