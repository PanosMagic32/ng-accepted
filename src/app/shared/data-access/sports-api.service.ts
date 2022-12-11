import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map, Observable, of, BehaviorSubject } from 'rxjs';

import { Sport } from './sport.interface';
import { League } from './league.interface';
import { Country } from './country.interface';

@Injectable({
  providedIn: 'root',
})
export class SportsApiService {
  private _sports$ = new BehaviorSubject<Sport[]>([]);

  public get sports$() {
    return this._sports$.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchSports(query = ''): Observable<boolean> {
    return this.http.get<{ sports: Sport[] }>(' https://www.thesportsdb.com/api/v1/json/2/all_sports.php').pipe(
      map((s) => s.sports),
      tap((sports) => {
        console.log(sports.filter((x) => x.strSport.includes(query) || x.strSportDescription.includes(query)));
        if (query && query !== '') {
          this._sports$.next(sports.filter((x) => x.strSport.includes(query)));
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

  fetchLeagues(): Observable<League[]> {
    return this.http.get<{ leagues: League[] }>(' https://www.thesportsdb.com/api/v1/json/2/all_leagues.php').pipe(
      map((l) => l.leagues),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }

  fetchCountries(): Observable<Country[]> {
    return this.http.get<{ countries: Country[] }>(' https://www.thesportsdb.com/api/v1/json/2/all_countries.php').pipe(
      map((c) => c.countries),
      catchError((e) => {
        console.error(e);
        return of(e);
      })
    );
  }
}
