import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: 메시지는 히어로 데이터를 가져온 _후에_ 보내야 합니다.
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
