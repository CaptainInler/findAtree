import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
private show: string = '';
  constructor() { }
showSection(section: string){
    this.show = section;
}
  ngOnInit() {
  }

}
