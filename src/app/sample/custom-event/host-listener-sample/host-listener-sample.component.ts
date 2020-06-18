import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-host-listener-sample',
  templateUrl: './host-listener-sample.component.html',
  styleUrls: ['./host-listener-sample.component.css']
})
export class HostListenerSampleComponent implements OnInit {

  keyDownCounter = 0;
  mouseClickCounter = 0;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log(event);
    this.keyDownCounter++;
  }

  // @HostListener('window:click', ['$event'])
  // handleClick(event: MouseEvent) {
  //   console.log(event);
  //   this.mouseClickCounter++;
  // }

  resetCounter() {
    this.keyDownCounter = 0;
    this.mouseClickCounter = 0;
  }
}
