import {
  Component, ViewChild, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, OnInit
} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TreeService } from './tree.service';
import { LoginComponent } from './members/login/login.component';
import { AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('tools',{
    read: ViewContainerRef })
  container: ViewContainerRef;
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
   toggleLogin() {
    if (this.loggedIn) {
      this.authService.logout();
    }else{
      this.addTool('login');
    }
   }
   addTool(tool: string){
    let comp= this._cfr.resolveComponentFactory(LoginComponent);
    switch (tool) {
      case 'members': {comp = this._cfr.resolveComponentFactory(LoginComponent);
                      break;}
      default: ;
    }
    let toolsComponent = this.container.createComponent(comp);
    toolsComponent.instance._ref = toolsComponent;
   }
}


