import {
  Component, ViewChild, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, OnInit, Input, ComponentRef
} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TreeService } from './tree.service';
import { LoginComponent } from './members/login/login.component';
import { EmailComponent } from './members/email/email.component';
import { SignupComponent } from './members/signup/signup.component';
import { AuthService } from './services/auth.service';
import { MembersComponent } from './members/members.component';
import { MapClickEvent } from './tree';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('tools', { read: ViewContainerRef })
  container: ViewContainerRef;
  toolComponent: any;
  memberSubComponent = '';
  mapClickData: MapClickEvent = null;
  cmpRef: ComponentRef<any>;
  loggedIn = false;

  constructor(private treeService: TreeService,
    private _cfr: ComponentFactoryResolver,
    private authService: AuthService,
    public appState: AppStateService) {
  }

  ngOnInit() {

    this.authService.userChanged.subscribe(
      () => {
        this.loggedIn = this.authService.isLoggedIn();
      }
    );

  }

  displayInfoPage() {
    document.getElementById('infoPage').style.display='';
  }

  userHasRole(role: string){
    return this.authService.hasRole(role);
  }

  // rescue button, if something does not work
  logout() {
    this.authService.logout();
    this.addTool('hide');
    console.log(this.authService.getUser());
  }
  toggleLogin() {
    if (this.loggedIn) {
      this.authService.logout();
    } else {
      this.addTool('login');
    }
  }
  loginEvent(event) {
    console.log(event);
    this.addTool(event);
  }

  setMode(mode) {
    this.appState.setMode(mode);
    // console.log('select mode');
    /* this.memberSubComponent = "mode-selector";
    this.addTool('member'); */
  }

  mapClicked(event: MapClickEvent) {
    console.log(event);
    this.mapClickData = event;
    if (event.attr && (this.authService.mode === 'play')) {
      this.memberSubComponent = "guess";
      this.addTool('member');
    } else if (this.authService.mode === 'add') {
      this.memberSubComponent = "add";
      this.addTool('member');
    }
  }

  // creates a component and shows it in the browser
  addTool(tool: string) {
    // first remove previously shown component
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    switch (tool) {
      case 'login': {
      this.toolComponent = LoginComponent;
        break;
      }
      case 'email': {
      this.toolComponent = EmailComponent;
        break;
      }
      case 'signup': {
      this.toolComponent = SignupComponent;
        break;
      }
      case 'member': {
      this.toolComponent = MembersComponent;
        break;
      }
      default: this.toolComponent = null;
    }
    if (this.toolComponent) {
      const comp = this._cfr.resolveComponentFactory(this.toolComponent);
      this.cmpRef = this.container.createComponent(comp);
      this.cmpRef.instance.subComponent = this.memberSubComponent;
      this.cmpRef.instance.mapClickData = this.mapClickData;
      this.cmpRef.instance.eventData.subscribe(
        (data) => {
          console.log(data);
          this.addTool(data);
          this.mapClickData = null;
          this.memberSubComponent = '';
        }
      );
    }
  }
}
