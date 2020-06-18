import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'button[counting]'
})
export class CountClicksDirective {

  numberOfClicks = 0;

  constructor() { }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
  }
}
