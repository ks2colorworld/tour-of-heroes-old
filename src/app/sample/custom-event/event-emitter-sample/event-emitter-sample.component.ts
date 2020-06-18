import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoItem, EventServiceSampleService } from '../event-service-sample.service';

@Component({
  selector: 'app-event-emitter-sample',
  templateUrl: './event-emitter-sample.component.html',
  styleUrls: ['./event-emitter-sample.component.css']
})
export class EventEmitterSampleComponent implements OnInit {

  // 참조: https://stackoverflow.com/questions/34700438/global-events-in-angular
  constructor(
    private someEvent: EventServiceSampleService
  ) { }

  ngOnInit() {
  }

  emitEvent(): void {
    console.log('emitEvent!!');
    // custom event 발생시킴
    const item: TodoItem = {name: 'some item', done: false};
    this.someEvent.add(item);
  }
}
