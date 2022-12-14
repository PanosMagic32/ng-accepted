import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, of, tap } from 'rxjs';

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
        if (query && query !== '') {
          const filteredSports = sports.filter(
            (s) => s.strSport?.toLowerCase().includes(query) || s.strSportDescription?.toLowerCase().includes(query)
          );

          this._sports$.next(filteredSports);
        } else {
          this._sports$.next(sports);
        }

        return of(true);
      }),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }

  fetchLeagues(query = ''): Observable<boolean> {
    return this.httpClient.get<{ leagues: League[] }>(` ${this.backendURL}/all_leagues.php`).pipe(
      map((l) => l.leagues),
      tap((leagues) => {
        if (query && query !== '') {
          const filteredLeagues = leagues.filter(
            (l) => l.strLeague?.toLowerCase().includes(query) || l.strLeagueAlternate?.toLowerCase().includes(query)
          );

          this._leagues$.next(filteredLeagues);
        } else {
          this._leagues$.next(leagues);
        }

        return of(true);
      }),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }

  fetchCountries(query = ''): Observable<boolean> {
    return this.httpClient.get<{ countries: Country[] }>(` ${this.backendURL}/all_countries.php`).pipe(
      map((c) => c.countries),
      tap((countries) => {
        if (query && query !== '') {
          const filteredCountries = countries.filter((c) => c.name_en?.toLowerCase().includes(query));

          this._countries$.next(filteredCountries);
        } else {
          this._countries$.next(countries);
        }

        return of(true);
      }),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }
}
