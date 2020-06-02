import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Hero } from '../classes/hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // 웹 API 형식의 URL로 사용

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private util: UtilService,
  ) { }

/* (튜토리얼 문서 설명)
HttpClient가 제공하는 메소드는 모두 RxJs Observable 타입을 한 번만 반환합니다.
HTTP는 요청과 응답으로 구성되는 프로토콜입니다. 그래서 요청이 한 번 있으면 응답도 한 번입니다.
일반적으로 옵저버블은 여러 번에 걸쳐 여러 데이터를 반환할 수 있습니다.
하지만 HttpClient가 반환하는 옵저버블은 데이터를 한번만 반환하고 종료되며, 다시 사용되지 않습니다.
예제에서 사용한 HttpClient.get()도 Observable<Hero[]> 데이터를 한번만 반환합니다.
*/

  /** GET: 서버에서 히어로 목록 가져오기 */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.util.handleErrorObservable<Hero[]>('getHeroes', []))
      );
  }

  /** GET: id에 해당하는 히어로 데이터를 가져옵니다. 존재하지 않으면 `undefined`를 반환합니다. */
  getHeroNo404<T>(id: number): Observable<T> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<T[]>(url)
      .pipe(
        map(heroes => heroes[0]), // 배열에 있는 항목 중 하나만 반환합니다.
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.util.handleErrorObservable<T>(`getHero id=${id}`, undefined))
      );
  }

  /** GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다. */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.util.handleErrorObservable<Hero>(`getHero id=${id}`))
    );
  }

  /* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 입력된 내용이 없으면 빈 배열을 반환합니다.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.util.handleErrorObservable<Hero[]>('searchHeroes', []))
    );
  }

  //////// 저장 기능 //////////

  /** POST: 서버에 새로운 히어로를 추가합니다. */
  addHero(hero: Hero): Promise<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.util.handleErrorObservable<Hero>('addHero'))
    ).toPromise();
  }

  /** DELETE: 서버에서 히어로를 제거합니다. */
  deleteHero(hero: Hero | number): Promise<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.util.handleErrorObservable<Hero>('deleteHero'))
    ).toPromise();
  }

  /** PUT: 서버에 저장된 히어로 데이터를 변경합니다. */
  updateHero(hero: Hero): Promise<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.util.handleErrorObservable<any>('updateHero'))
    ).toPromise();
  }

  /** HeroService에서 보내는 메시지는 MessageService가 화면에 표시합니다. */
  private log(message: string) {
    this.messageService.add(`Hero-httpService: ${message}`);
  }
}
