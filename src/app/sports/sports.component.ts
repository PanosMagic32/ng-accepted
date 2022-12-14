import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { Sport } from './data-access/sport.interface';
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
  // Inject the SportsDBAPIService & assign it to a variable.
  sportsDBAPIService = inject(SportsDBAPIService);

  // Assign the 'sports' Observable to a variable to use with the async pipe in the template.
  sports$ = this.sportsDBAPIService.sports$;

  // The trackBy function, for the ngFor loop optimization.
  trackByFN(index: number, sport: Sport) {
    return sport.idSport;
  }
}
