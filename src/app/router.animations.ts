import { trigger, state, animate, transition, style} from '@angular/animations';

export function moveIn() {
  return trigger('moveIn', [
    state('void', style({position: 'fixed', width: '100%'}) ),
    state('*', style({position: 'fixed', width: '100%'}) ),
    transition(':enter', [
      style({opacity:'0', transform: 'translateX(100px)'}),
      animate('.6s ease-in-out', style({opacity:'1', transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({opacity:'1', transform: 'translateX(0)'}),
      animate('.3s ease-in-out', style({opacity:'0', transform: 'translateX(-200px)'}))
    ])
  ]);
}

export function fallIn() {
  return trigger('fallIn', [
    transition(':enter', [
      style({opacity:'0', transform: 'translateY(40px)'}),
      animate('.4s .2s ease-in-out', style({opacity:'1', transform: 'translateY(0)'}))
    ]),
    transition(':leave', [
      style({opacity:'1', transform: 'translateX(0)'}),
      animate('.3s ease-in-out', style({opacity:'0', transform: 'translateX(-200px)'}))
    ])
  ]);
}

export function moveInLeft() {
  return trigger('moveInLeft', [
    transition(':enter', [
      style({opacity:'0', transform: 'translateX(-100px)'}),
      animate('.6s .2s ease-in-out', style({opacity:'1', transform: 'translateX(0)'}))
    ])
  ]);
}

export function showMap() {
  return trigger('showMap', [
    state('hide', style({transform: 'translateX(-400%)'})),
    state('show', style({transform: 'translateX(0)'})),
    transition('hide => show', animate('1.6s')),
    transition('void => *', [style ({transform: 'translateX(-400%)'}), animate(10)])
    ]);
}

export function moveInRight() {
  return trigger('moveInRight', [
    state('right', style({})),
    state('bottom', style({ backgroundColor: '#AA0000'})),
    transition(':enter', [
      style({opacity:'0', transform: 'translateX(200px)'}),
      animate('1.2s .2s ease-in-out', style({opacity:'1', transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({opacity:'1', transform: 'translateX(0px)'}),
      animate('1.2s .2s ease-in-out', style({opacity:'0', transform: 'translateX(200px)'}))
    ]),
    transition('right => bottom', animate('100ms ease-in'))
  ]);
}
