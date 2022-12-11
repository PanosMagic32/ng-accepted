import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { SportsApiService } from '@shared/data-access/sports-api.service';

@Injectable()
export class SportsResolver implements Resolve<boolean> {
  constructor(private sportsApiService: SportsApiService) {}

  resolve(): Observable<boolean> {
    return this.sportsApiService.fetchSports();
  }
}
