import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import {  Observable, observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
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
    return this.http.get<Hero[]>(this.heroesUrl);
    
  }
  /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url);
}
  // getHero(id: number): Observable<Hero> //mock-heroes.ts
  // {
  //   const hero = HEROES.find(h=>h.id===id)!;
  //   return of(hero);
  // }
 private log (message:string)
 {
  this.messageService.add(`HeroService: ${message}`);
 }
 updateHero(hero: Hero) : Observable<any>
 {
  return this.http.put(this.heroesUrl, hero, this.httpOptions);
 }
 addHero(hero:Hero): Observable<Hero>{
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions);
 }
 deleteHero(id: number) {
 const url =`${this.heroesUrl}/${id}`;
 return this.http.delete<Hero>(url, this.httpOptions);
}
searchHeroes(term:string): Observable<Hero[]>
{
  if(!term.trim())
  {
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`);
}
}
