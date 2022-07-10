import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl ='api/heroes';
  constructor(
    private http:HttpClient,
    private messageService: MessageService) {}
  // getHeroes(): Observable<Hero[]>  //mock-heroes.ts
  // {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }
  getHeroes(): Observable<Hero[]> //in-memory-data
  {
    return this.http.get<Hero[]>(this.heroesUrl)
  }
  getHero(id: number): Observable<Hero>
  {
    const hero = HEROES.find(h=>h.id===id)!;
    return of(hero);
  }
 private log (message:string)
 {
  this.messageService.add(`HeroService: ${message}`);
 }
}
