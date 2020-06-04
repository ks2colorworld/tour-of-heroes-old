import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/classes/hero';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-hero-detail-view',
  templateUrl: './hero-detail-view.component.html',
  styleUrls: ['./hero-detail-view.component.css']
})
export class HeroDetailViewComponent implements OnInit {
  @Input() $hero: Hero;
  @Input() $readonly = true;

  constructor(
    public util: UtilService,
  ) { }

  ngOnInit(): void {
  }

}
