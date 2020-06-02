import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';

import { MessageService } from './message.service';
import { Hero } from 'src/app/classes/hero';
import { UtilService } from './util.service';
import { HEROES } from '../classes/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private collectionName = 'heroes';
  private newHeroId = 11;

  constructor(
    private firestore: AngularFirestore,
    private messageService: MessageService,
    private util: UtilService,
  ) {
    this.genId();
  }

  private genId() {
    this.firestore.collection<Hero>(
      this.collectionName,
      ref => ref.orderBy('id', 'desc').limit(1)
    ).snapshotChanges()
    .subscribe(
      h => {
        if (h.length === 0) {
          // 데이터가 존재하지 않을 경우 MockData 입력
          HEROES.forEach(hero => this.updateHero(hero));
        }
        this.newHeroId = 0 < h.length ? h[0].payload.doc.data().id + 1 : 11;
        console.log(this.newHeroId);
      }
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.firestore.collection(
      this.collectionName
    ).get().pipe(
      map(snapshots => {
        return snapshots.docs.map(doc => {
          const hero = doc.data() as Hero;
          // console.log(hero);
          return hero;
        });
      }),
      tap(() => {
        this.log('fetched heroes');
      }),
      catchError(this.util.handleErrorObservable<Hero[]>(this.getHeroes.name, [], this.log))
    );
  }

  /* firebase 기본제공 검색기능이 매우 미숙함. >> 추후 외부 검색서비스 연결예정 */
  searchHeroes(term: string): Observable<Hero[]> {
    const termString = term.trim();
    const heroes: Hero[] = [];
    if (!termString.trim()) {
      return of(heroes);
    }

    const text = termString;
    const end = text.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

    return this.firestore.collection(
      this.collectionName,
      query => query.orderBy('name', 'asc')
      .where('name', '>=', text).where('name', '<', end)
    ).get().pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          return doc.data() as Hero;
        });
      }),
      tap(rHeroes => {
        0 < rHeroes.length ?
        this.log(`found heroes matching "${termString}"`)
        : this.log(`no heroes matching "${termString}"`);
      }),
      catchError(this.util.handleErrorObservable<Hero[]>(this.searchHeroes.name, [], this.log))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.firestore.collection(
      this.collectionName
    ).doc(id.toString()).get().pipe(
      map(doc => {
        return doc.data() as Hero;
      }),
      tap(x => {
        this.log(`fetched hero id=${x.id}`);
      }),
      catchError(this.util.handleErrorObservable<Hero>(this.getHero.name, null, this.log))
    );
  }

  addHero(hero: Hero): Promise<Hero> {
    hero.id = this.newHeroId;

    return this.firestore.collection<Hero>(
      this.collectionName
    ).doc(hero.id.toString()).set(hero) // ).add(hero) << 자동id 부여됨.
    .then(_ => {
      return of(hero).toPromise(); // new Promise<Hero>(re => re(hero));
    })
    .catch(this.util.handleErrorPromise<Hero>(this.addHero.name, hero, this.log))
    .finally(() => {
      this.log(`add hero id=${hero.id}`);
    });

  }

  updateHero(hero: Hero): Promise<any> {
    return this.firestore.collection<Hero>(
      this.collectionName
    ).doc(hero.id.toString()).set(hero, {merge: true})
    .then(_ => {
      return of(hero).toPromise(); // new Promise<string>(re => re(hero.id.toString()));
    })
    .catch(this.util.handleErrorPromise<Hero>(this.updateHero.name, hero, this.log))
    .finally(() => {
      this.log(`updated hero id=${hero.id}`);
    });
  }

  deleteHero(pHero: Hero|number): Promise<any> {
    const id = typeof pHero === 'number' ? pHero : pHero.id;
    const hero: Hero = typeof pHero === 'number' ? {id: pHero, name: 'deletedHero'} : pHero;
    return this.firestore.doc<Hero>(
      `${this.collectionName}/${id}`
    ).delete().then(_ => {
      return of(hero).toPromise(); // new Promise<Hero>(re => re(hero));
    }).catch(this.util.handleErrorPromise<Hero>(this.deleteHero.name, hero, this.log))
    .finally(() => {
      this.log(`deleted hero id=${id}`);
    });
  }


  private log(message: string) {
    this.messageService.add(`Hero-firebaseService: ${message}`);
  }
}
