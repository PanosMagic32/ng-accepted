import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

@Injectable({ providedIn: 'root' })
export class CountriesResolver implements Resolve<boolean> {
  // Inject the SportsDBAPIService & assign it to a variable.
  sportsDBAPIService = inject(SportsDBAPIService);

  resolve(): Observable<boolean> {
    // Resolve the 'fetchCountries' function that handles the HTTP GET call to fetch the countries.
    return this.sportsDBAPIService.fetchCountries();
  }
}
