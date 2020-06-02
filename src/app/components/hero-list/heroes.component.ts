import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/classes/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).then(
      hero => {
        this.heroes.push(hero);
      }
    );
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).then(
      _ => {
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
      }
    );
  }
}
