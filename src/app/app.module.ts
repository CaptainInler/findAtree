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

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    // imports firebase/app needed for everything
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    AppRoutingModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    MembersComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    EmailComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    MapService, TreeService, AuthService, AuthGuard
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class AppModule {}
