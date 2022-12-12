import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';
import { Sport } from '@shared/data-access/sport.interface';

import { SportItemComponent } from './ui/sports-item.component';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, SportItemComponent],
  template: `
    <div *ngIf="sports$ | async" class="sports-list-container">
      <app-sport-item *ngFor="let sport of sports$ | async; trackBy: trackByFN" [sport]="sport"></app-sport-item>
    </div>
  `,
  styles: [
    `
      .sports-list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      .sports-list-container > * {
        flex: 1 1 20rem;
      }
    `,
  ],
})
export class SportsComponent {
  sportsDBAPIService = inject(SportsDBAPIService);
  sports$ = this.sportsDBAPIService.sports$;

  trackByFN(index: number, sport: Sport) {
    return sport.idSport;
  }
}
