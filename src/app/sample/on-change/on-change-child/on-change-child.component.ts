import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-on-change-child',
  templateUrl: './on-change-child.component.html',
  styleUrls: [
    './on-change-child.component.css'
  ]
})
export class OnChangeChildComponent implements OnInit, OnChanges {

  @Input() parentData: any;
  @Output() clickChangeDataButton = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  // * / 참고 사이트 OnChanges 사용법
  // https://www.stackchief.com/blog/ngOnChanges%20Example%20%7C%20Angular
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.parentData);
  }
  changeFromChild() {
    // this.parentData -= 1; // 직접 변경하지 않고, 이벤트발생시켜서 작동코드별도 작성
    this.clickChangeDataButton.emit();
  }
  // */
}
