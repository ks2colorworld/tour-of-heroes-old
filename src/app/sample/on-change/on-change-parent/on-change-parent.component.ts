import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-change-parent',
  templateUrl: './on-change-parent.component.html',
  styleUrls: ['./on-change-parent.component.css']
})
export class OnChangeParentComponent implements OnInit {

  data = 0; // 'a';

  constructor() { }

  ngOnInit(): void {
  }

  changeFromParent() {
    this.data += 1; // 'b';
  }
}
