import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[fatWindowWidth]'
})
export class WindowWidthDirective {

  @Output() winWidth:EventEmitter<number> = new EventEmitter();

  constructor() { }


  @HostListener('window:resize',['$event']) onResize(event) {
    // console.log(event.target.innerWidth);
    this.winWidth.emit(event.target.innerWidth);
  }


}
