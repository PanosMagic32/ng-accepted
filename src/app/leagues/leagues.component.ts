import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';
import { League } from '@shared/data-access/league.interface';

import { LeagueItemComponent } from './ui/league-item.component';

@Component({
  selector: 'app-leagues',
  standalone: true,
  template: `
    <div *ngIf="leagues$ | async" class="leagues-list-container">
      <app-league-item *ngFor="let league of leagues$ | async; trackBy: trackByFN" [league]="league"></app-league-item>
    </div>
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
  imports: [NgIf, NgFor, AsyncPipe, LeagueItemComponent],
})
export class LeaguesComponent {
  sportsDBAPIService = inject(SportsDBAPIService);
  leagues$ = this.sportsDBAPIService.leagues$;

  trackByFN(index: number, league: League) {
    return league.idLeague;
  }
}