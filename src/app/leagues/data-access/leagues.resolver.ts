import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

@Injectable({ providedIn: 'root' })
export class LeaguesResolver implements Resolve<boolean> {
  // Inject the SportsDBAPIService & assign it to a variable.
  sportsDBAPIService = inject(SportsDBAPIService);

  resolve(): Observable<boolean> {
    // Resolve the 'fetchLeagues' function that handles the HTTP GET call to fetch the leagues.
    return this.sportsDBAPIService.fetchLeagues();
  }
}
