import {
  Component, ViewChild, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, OnInit, Input, ComponentRef
} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TreeService } from './tree.service';
import { LoginComponent } from './members/login/login.component';
import { EmailComponent} from './members/email/email.component';
import { SignupComponent} from './members/signup/signup.component';
import { AuthService} from './services/auth.service';
import { MembersComponent } from './members/members.component';
import { ModeSelectorComponent} from './members/mode-selector/mode-selector.component';
import {subscribeToResult} from 'rxjs/util/subscribeToResult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('tools',{
    read: ViewContainerRef })
  container: ViewContainerRef;
  @Input() type;
  cmpRef: ComponentRef<any>;
  title = "Loading data...";
  loggedIn: boolean = false;
  constructor(private treeService: TreeService, private _cfr: ComponentFactoryResolver, private authService: AuthService) {
    this.treeService.dataLoaded.subscribe(() => {
      this.title = "Find A Tree";
    })
   }
   ngOnInit() {
    this.authService.userChanged.subscribe(
      ()=>{
        this.loggedIn = this.authService.isLoggedIn();
      }
    );
   }
   // rescue button, if something does not work
   logout(){
    this.authService.logout();
     this.addTool('hide');
     console.log(this.authService.getUser());
   }
   toggleLogin() {
    if (this.loggedIn) {
      this.authService.logout();
    }else{
      this.addTool('login');
    }
   }
   loginEvent(event) {
    console.log(event);
    this.addTool(event);
   }

   showComponent

   // creates a component and shows it in the browser
   addTool(tool: string){
    // first remove previously shown component
    if (this.cmpRef){
      this.cmpRef.destroy();
    }
    switch (tool) {
      case 'login': {this.type = LoginComponent;
        break;}
      case 'email': {this.type = EmailComponent;
         break;}
      case 'signup': {this.type = SignupComponent;
        break;}
      case 'mode': {this.type = MembersComponent;
        break;}
      default: this.type = null;
    }
    if (this.type) {
      let comp = this._cfr.resolveComponentFactory(this.type);
      this.cmpRef = this.container.createComponent(comp);
      this.cmpRef.instance.eventData.subscribe(
        (data)=>{
          console.log(data);
          this.addTool(data);
        }
      );
    }
   }
}


