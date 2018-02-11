import { environment } from '../environments/environment';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material/material.module';

// components
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './members/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './members/signup/signup.component';
import { EmailComponent } from './members/email/email.component';
import { AuthGuard } from './services/auth.guard';
import { ModeSelectorComponent } from './members/mode-selector/mode-selector.component';
import { AdminComponent } from './admin/admin.component';
import { TreenamesComponent } from './admin/treenames/treenames.component';
import { GuessComponent } from './members/guess/guess.component';
import { AddComponent } from './members/add/add.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminGuard } from './services/admin.guard';

// services
import { MapService } from './map/map.service';
import { TreeService } from './tree.service';
import { TreeNameService } from './services/tree-name.service';
import { AuthService} from './services/auth.service';

@NgModule({
  imports: [
    // modules, everything declared here and under declarations may be used in component templates
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFireDatabaseModule,
    AppRoutingModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
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
    ModeSelectorComponent,
    AdminComponent,
    TreenamesComponent,
    GuessComponent,
    AddComponent,
    UsersComponent
  ],
  bootstrap: [ AppComponent ], // component to start with
  providers: [
    // services
    MapService, TreeService, AuthService, AuthGuard, TreeNameService, AdminGuard
  ],
  entryComponents: [
    // components to be dynamically loaded
    LoginComponent, EmailComponent, SignupComponent, MembersComponent
  ]
})
export class AppModule {}
