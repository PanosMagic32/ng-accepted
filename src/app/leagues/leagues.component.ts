import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { League } from './data-access/league.interface';
import { LeagueItemComponent } from './ui/league-item.component';

@Component({
  selector: 'app-leagues',
  standalone: true,
  template: `
    <ng-container *ngIf="isLoading$ | async">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-container>

    <div *ngIf="(leagues$ | async) && (isLoading$ | async) === false; else noContent" class="leagues-list-container">
      <app-league-item *ngFor="let league of leagues$ | async; trackBy: trackByFN" [league]="league"></app-league-item>
    </div>

    <ng-template #noContent>
      <p *ngIf="(isLoading$ | async) === false">No content available to display.</p>
    </ng-template>
  `,
  styles: [
    `
      .leagues-list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      .leagues-list-container > * {
        flex: 1 1 20rem;
      }
    `,
  ],
  imports: [NgIf, NgFor, AsyncPipe, MatProgressBarModule, LeagueItemComponent],
})
export class LeaguesComponent {
  // Inject the SportsDBAPIService & assign it to a variable.
  sportsDBAPIService = inject(SportsDBAPIService);

  // Assign the 'leagues' Observable to a variable to use with the async pipe in the template.
  leagues$ = this.sportsDBAPIService.leagues$;

  // Assign the 'isLoading' Observable to a variable to use with the async pipe in the template.
  isLoading$ = this.sportsDBAPIService.isLoading$;

  // The trackBy function, for the ngFor loop optimization.
  trackByFN(index: number, league: League) {
    return league.idLeague;
  }
}
