import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/classes/hero';
import { HeroService } from 'src/app/services/hero-fire.service';
import { Attachment } from 'src/app/classes/attachment';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [{id: 0, name: 'loading heroes...'}];

  // for fileUpload
  selectedFiles: FileList;
  isHeroImageUpload = false;
  currentFile: Attachment;
  progress: {percentage: number} = {percentage: 0};

  constructor(
    private heroService: HeroService,
    public util: UtilService,
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
    this.heroService.deleteHero(hero).then(
      _ => {
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
      }
    );
  }

  uploadCompleteCallback(event: any, heroName: string) {
    // TODO : heroName이 빈칸 체크 후 이미지 업로드 방법?
    const fileInfo = event.value as Attachment;
    // console.log(heroName, fileInfo.name);
    this.heroService.addHero(
      {
        name: heroName,
        imageKey: fileInfo.key,
        imageUrl: fileInfo.url
      } as Hero
    ).then(hero => this.heroes.push(hero));
  }

  setMockData() {
    this.heroService.setMockHeroes().subscribe(complete => {
      if (complete) {
        this.getHeroes();
      }
    });
  }
}
