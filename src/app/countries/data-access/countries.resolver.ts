import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

@Injectable({ providedIn: 'root' })
export class CountriesResolver implements Resolve<boolean> {
  sportsDBAPIService = inject(SportsDBAPIService);

  resolve(): Observable<boolean> {
    return this.sportsDBAPIService.fetchCountries();
  }
}
