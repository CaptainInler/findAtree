import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';

import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { TreeService } from './tree.service';
import { AuthService} from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './members/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './members/signup/signup.component';
import { EmailComponent } from './members/email/email.component';
import {AuthGuard} from './services/auth.guard';
import { ModeSelectorComponent } from './members/mode-selector/mode-selector.component';
import { AdminComponent } from './admin/admin.component';
import { TreenamesComponent } from './admin/treenames/treenames.component';

@NgModule({
  imports: [                            // modules, everything declared here and under declarations may be used in component templates
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    // imports firebase/app needed for everything
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    AppRoutingModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [                       //declarables: directives (Attribute, Structural), components, pipes. Can only be declared in one module
    AppComponent,
    MapComponent,
    MembersComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    EmailComponent,
    ModeSelectorComponent,
    AdminComponent,
    TreenamesComponent
  ],
  bootstrap: [ AppComponent ],           // component to start with
  providers: [                           // services
    MapService, TreeService, AuthService, AuthGuard
  ],
  entryComponents: [                     // components to be dynamically loaded
    LoginComponent, EmailComponent, SignupComponent, MembersComponent
  ]
})
export class AppModule {}
