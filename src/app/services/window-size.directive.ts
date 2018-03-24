import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appWindowSize]'
})
export class WindowSizeDirective {

  @Output() winSize: EventEmitter<any> = new EventEmitter();

  constructor() { }


  @HostListener('window:resize', ['$event']) onResize(event) {
    // console.log(event.target.innerWidth);
    this.winSize.emit({width: event.target.innerWidth, height: event.target.innerHeight});
  }


}
