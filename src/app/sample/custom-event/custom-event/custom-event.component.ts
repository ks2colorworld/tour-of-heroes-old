import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, takeUntil, takeWhile } from 'rxjs/operators';
import { EventServiceSampleService, TodoItem } from '../event-service-sample.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.css']
})
export class CustomEventComponent implements OnInit, OnDestroy {

  private addedItem: TodoItem;
  private unsubscribe$ = new Subject();
  // private subscribing = true;

  constructor(
    private someEvent: EventServiceSampleService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    // this.subscribing = false;
  }

  ngOnInit() {
    // 구독취소하는 여러가지 방법 : https://ddalpange.github.io/2018/11/21/how-to-unsubscibe-in-rxjs/
    this.someEvent.itemAdded$.pipe(
      // take(1) // 한번만 구독
      takeUntil(this.unsubscribe$) // 인자로 넣어준 Observable (Subject)가 값을 방출하거나 종료할 경우 구독을 해제
      // takeWhile(this.subscribing) // TODO : 인자로 넣어준 Boolean 값이 false일 경우 구독 해제 (작동하지 않음)
    )
    .subscribe((item: TodoItem) => this.onItemAdded(item));
  }

  private onItemAdded(item: TodoItem): void {
    // do something with added item
    this.addedItem = item;
    console.log(this.addedItem);
  }

  // TODO : 아래방식으로 변경방법??
  // @HostListener('__SomeEvent__', ['$event'])
  // handleSomeEvent(event: SomeEvent) {
  //   console.log('HostListener!!');
  // }
}
