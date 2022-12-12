import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { BACKEND_URL } from 'src/main';
import { Sport } from './sport.interface';
import { League } from './league.interface';
import { Country } from './country.interface';

@Injectable({ providedIn: 'root' })
export class SportsDBAPIService {
  backendURL = inject(BACKEND_URL);
  httpClient = inject(HttpClient);

  private _sports$ = new BehaviorSubject<Sport[]>([]);
  private _leagues$ = new BehaviorSubject<League[]>([]);
  private _countries$ = new BehaviorSubject<Country[]>([]);

  public get sports$() {
    return this._sports$.asObservable();
  }

  public get leagues$() {
    return this._leagues$.asObservable();
  }

  public get countries$() {
    return this._countries$.asObservable();
  }

  fetchSports(query = ''): Observable<boolean> {
    return this.httpClient.get<{ sports: Sport[] }>(` ${this.backendURL}/all_sports.php`).pipe(
      map((s) => s.sports),
      tap((sports) => {
        console.log(sports.filter((x) => x.strSport.includes(query) || x.strSportDescription.includes(query)));
        // if (query && query !== '') {
        //   this._sports$.next(sports.filter((x) => x.strSport.includes(query)));
        // } else {
        //   this._sports$.next(sports);
        // }

        this._sports$.next(sports);

        return of(true);
      }),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }

  fetchLeagues(): Observable<boolean> {
    return this.httpClient.get<{ leagues: League[] }>(` ${this.backendURL}/all_leagues.php`).pipe(
      map((l) => l.leagues),
      tap((leagues) => {
        console.log(leagues);

        this._leagues$.next(leagues);

        return of(true);
      }),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }

  fetchCountries(): Observable<boolean> {
    return this.httpClient.get<{ countries: Country[] }>(` ${this.backendURL}/all_countries.php`).pipe(
      map((c) => c.countries),
      tap((countries) => {
        console.log(countries);

        this._countries$.next(countries);

        return of(true);
      }),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }
}
