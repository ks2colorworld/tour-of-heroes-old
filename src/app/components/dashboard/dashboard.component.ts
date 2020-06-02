import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/classes/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => {
        /* 데이트 확인용 샘플코드
        heroes.forEach(
          (hero, index) => {
            console.log(index, hero.id);
        });
        // */
        this.heroes = heroes.slice(0, 4);
      }
    );
  }
}
