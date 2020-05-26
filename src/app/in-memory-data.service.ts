import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb() {
    return {heroes: HEROES}; // {heroes} // 규칙 : 접근 url과 동일한 개체를 넘겨줘야 한다. url : 'api/heroes' => return {heroes:[]}
  }

  // 히어로 객체가 항상 id 프로퍼티를 갖도록 getId 메소드를 오버라이드 합니다.
  // 히어로 목록이 비어있다면 이 메소드는 초기값(11)을 반환합니다.
  // 히어로 목록이 비어있지 않으면 히어로 id의 최대값에 1을 더해서 반환합니다.
  genId(heroes: Hero[]): number {
    // 아래 한줄 기존코드 풀어서 작성해봄.
    const heroIds: number[] = heroes.map(hero => hero.id);
    const maxIdNumber: number = Math.max(...heroIds);
    return 0 < heroes.length ? maxIdNumber + 1 : 11;

    // 기존코드 : return 0 < heroes.length ? Math.max(...heroes.map(hero =>hero.id)) + 1 : 11;

    // 정의  : Math.max(...values:number[]):number
    // 활용1 : Math.max(1,2,3,4,5,6)
    // 활용2 : Math.max(...[1,2,3,4,5,6])
  }
}
