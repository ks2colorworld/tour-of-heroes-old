import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventServiceSampleService {

  // 참조: https://stackoverflow.com/questions/34700438/global-events-in-angular
  public itemAdded$: EventEmitter<TodoItem> = new EventEmitter();
  private todoList: TodoItem[] = [];

  constructor() {
    // this.itemAdded$ = new EventEmitter();
  }

  public list(): TodoItem[] {
    return this.todoList;
  }

  public add(item: TodoItem): void {
      this.todoList.push(item);
      this.itemAdded$.emit(item);
  }

  emitEvent(): void {
    console.log('emitEvent!!');
    // custom event 발생시킴
    const item: TodoItem = {name: 'some item', done: false};
    this.itemAdded$.emit(item);
  }
}

export class TodoItem {
  constructor(
    public name: string,
    public done: boolean
  ) {}
}
