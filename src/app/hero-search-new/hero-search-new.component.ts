import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search-new',
  templateUrl: './hero-search-new.component.html',
  styleUrls: ['./hero-search-new.component.css']
})
export class HeroSearchNewComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  selectedHeroId: number;
  get SelectedHeroId(): number {
    return this.selectedHeroId;
  }
  set SelectedHeroId(v: number) {
    this.router.navigateByUrl(`/detail/${v}`);
    this.selectedHeroId = v;
  }

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 연속된 키입력을 처리하기 위해 300ms 대기합니다.
      debounceTime(300),

      // 이전에 입력한 검색어와 같으면 무시합니다.
      distinctUntilChanged(),

      // 검색어가 변경되면 새로운 옵저버블을 생성합니다.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  // 사용자가 입력한 검색어를 옵저버블 스트림으로 보냅니다.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
