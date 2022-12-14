import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

@Injectable({ providedIn: 'root' })
export class SportsResolver implements Resolve<boolean> {
  // Inject the SportsDBAPIService & assign it to a variable.
  sportsDBAPIService = inject(SportsDBAPIService);

  resolve(): Observable<boolean> {
    // Resolve the 'fetchSports' function that handles the HTTP GET call to fetch the sports.
    return this.sportsDBAPIService.fetchSports();
  }
}
