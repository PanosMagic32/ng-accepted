import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { Sport } from '@sports/data-access/sport.interface';
import { League } from '@leagues/data-access/league.interface';
import { Country } from '@countries/data-access/country.interface';

import { BACKEND_URL } from 'src/main';

@Injectable({ providedIn: 'root' })
export class SportsDBAPIService {
  // Inject the backend's URL string & the HTTP client.
  backendURL = inject(BACKEND_URL);
  httpClient = inject(HttpClient);

  // Implement loading BehaviourSubject to handle loading spinner for better UX.
  private _isLoading$ = new BehaviorSubject(false);

  /**
   * Make local private variables of the data we retrieve from the API, so that they can be used as a reference
   * for several other places to subscribe to and get updated, as long as for the search funcionality data filtering.
   */
  private _sports$ = new BehaviorSubject<Sport[]>([]);
  private _leagues$ = new BehaviorSubject<League[]>([]);
  private _countries$ = new BehaviorSubject<Country[]>([]);

  /**
   * Expose the private variables with getters, for data immutability.
   */
  public get sports$() {
    return this._sports$.asObservable();
  }

  public get leagues$() {
    return this._leagues$.asObservable();
  }

  public get countries$() {
    return this._countries$.asObservable();
  }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  /**
   * The HTTP GET call to fetch the 'sports' list.
   * @param query The query string to use for the search funcionality.
   * @returns Returns an Observable<boolean> for a successfull call to be used from the resolver (see sports.resolver.ts)
   * for data prefetching when accessing the 'sports' route, and an error Observable when the HTTP call fails.
   */
  fetchSports(query = ''): Observable<boolean> {
    this._isLoading$.next(true);

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

        this._isLoading$.next(false);

        return of(true);
      }),
      catchError((e) => {
        this._isLoading$.next(false);

        return of(e);
      })
    );
  }

  /**
   * The HTTP GET call to fetch the 'leagues' list.
   * @param query The query string to use for the search funcionality.
   * @returns Returns an Observable<boolean> for a successfull call to be used from the resolver (see leagues.resolver.ts)
   * for data prefetching when accessing the 'leagues' route, and an error Observable when the HTTP call fails.
   */
  fetchLeagues(query = ''): Observable<boolean> {
    this._isLoading$.next(true);

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

        this._isLoading$.next(false);

        return of(true);
      }),
      catchError((e) => {
        this._isLoading$.next(false);

        return of(e);
      })
    );
  }

  /**
   * The HTTP GET call to fetch the 'countries' list.
   * @param query The query string to use for the search funcionality.
   * @returns Returns an Observable<boolean> for a successfull call to be used from the resolver (see countries.resolver.ts)
   * for data prefetching when accessing the 'countries' route, and an error Observable when the HTTP call fails.
   */
  fetchCountries(query = ''): Observable<boolean> {
    this._isLoading$.next(true);

    return this.httpClient.get<{ countries: Country[] }>(` ${this.backendURL}/all_countries.php`).pipe(
      map((c) => c.countries),
      tap((countries) => {
        if (query && query !== '') {
          const filteredCountries = countries.filter((c) => c.name_en?.toLowerCase().includes(query));

          this._countries$.next(filteredCountries);
        } else {
          this._countries$.next(countries);
        }

        this._isLoading$.next(false);

        return of(true);
      }),
      catchError((e) => {
        this._isLoading$.next(false);

        return of(e);
      })
    );
  }
}
