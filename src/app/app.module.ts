import { environment } from '../environments/environment';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { DeviceDetectorModule } from "ngx-device-detector";

// components
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './members/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './members/signup/signup.component';
import { EmailComponent } from './members/email/email.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { TreenamesComponent } from './admin/treenames/treenames.component';
import { UsersComponent } from './admin/users/users.component';
import { EsriMapComponent } from './map/esri-map/esri-map.component';
import { SidePanelComponent } from './map/side-panel/side-panel.component';
import { EditorPanelComponent } from './map/editor-panel/editor-panel.component';
import { AddTreePanelComponent } from './map/add-tree-panel/add-tree-panel.component';
import { GuessPanelComponent } from './map/guess-panel/guess-panel.component';
import { LoadingPageComponent} from './map/loading-page/loading-page.component';

import { SortAlphabeticalPipe } from './shared/sort-alphabetical.pipe';

// services
import { AdminGuard } from './services/admin.guard';
import { MapDataService } from './services/map-data.service';
import { AuthService} from './services/auth.service';
import { AppStateService } from './services/app-state.service';
import { WindowSizeDirective } from './services/window-size.directive';


@NgModule({
  imports: [
    // modules, everything declared here and under declarations may be used in component templates
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFireDatabaseModule,
    AppRoutingModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    DeviceDetectorModule.forRoot()
  ],
  declarations: [
    // declarables: directives (Attribute, Structural), components, pipes.
    AppComponent,
    MapComponent,
    MembersComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    EmailComponent,
    AdminComponent,
    TreenamesComponent,
    UsersComponent,
    EsriMapComponent,
    SidePanelComponent,
    EditorPanelComponent,
    AddTreePanelComponent,
    GuessPanelComponent,
    LoadingPageComponent,
    SortAlphabeticalPipe,
    WindowSizeDirective,
  ],
  bootstrap: [ AppComponent ], // component to start with
  providers: [
    // services
    MapDataService, AuthService, AuthGuard, AdminGuard,
    AppStateService
  ],
  entryComponents: [
    // components to be dynamically loaded
    LoginComponent, EmailComponent, SignupComponent, MembersComponent
  ]
})
export class AppModule {}
