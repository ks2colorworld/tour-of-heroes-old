import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-attachment-list-container',
  templateUrl: './attachment-list-container.component.html',
  styleUrls: ['./attachment-list-container.component.css']
})
export class AttachmentListContainerComponent implements OnInit {
  /* html element에 접근하는 예시
  @ViewChild('attachmentList') attachmentList: any;
  // */

  constructor() { }

  ngOnInit(): void {
  }

  /* for test
  doSomething(event) {
    console.log(event);
    console.log(event.value);
    this.attachmentList.getFileList();
  }
  // */
}
