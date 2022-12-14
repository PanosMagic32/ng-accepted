import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { Sport } from './data-access/sport.interface';
import { SportItemComponent } from './ui/sports-item.component';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, MatProgressBarModule, SportItemComponent],
  template: `
    <ng-container *ngIf="isLoading$ | async">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-container>

    <div *ngIf="(sports$ | async) && (isLoading$ | async) === false; else noContent" class="sports-list-container">
      <app-sport-item *ngFor="let sport of sports$ | async; trackBy: trackByFN" [sport]="sport"></app-sport-item>
    </div>

    <ng-template #noContent>
      <p *ngIf="(isLoading$ | async) === false">No content available to display.</p>
    </ng-template>
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

  // Assign the 'isLoading' Observable to a variable to use with the async pipe in the template.
  isLoading$ = this.sportsDBAPIService.isLoading$;

  // The trackBy function, for the ngFor loop optimization.
  trackByFN(index: number, sport: Sport) {
    return sport.idSport;
  }
}
