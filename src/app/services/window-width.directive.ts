import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[fatWindowWidth]'
})
export class WindowWidthDirective {

  @Output() position:EventEmitter<string> = new EventEmitter();

  constructor() {
    this.setPosition(window.innerWidth);
  }


  @HostListener('window:resize',['$event']) onResize(event) {
    console.log(event.target.innerWidth);
    this.setPosition(event.target.innerWidth);
  }

  setPosition(size: number){
    if (size > 600){
      this.position.emit('right');
    }else{
      this.position.emit('bottom');
    }
  }


}
