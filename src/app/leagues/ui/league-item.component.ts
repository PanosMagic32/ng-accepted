import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { League } from '@leagues/data-access/league.interface';

@Component({
  selector: 'app-league-item',
  standalone: true,
  template: `
    <ng-container *ngIf="league">
      <mat-card class="league-item-card">
        <mat-card-content>
          <p>League: {{ league.strLeague }}</p>

          <p>League (native): {{ league.strLeagueAlternate }}</p>

          <p>Sport: {{ league.strSport }}</p>
        </mat-card-content>
      </mat-card>
    </ng-container>
  `,
  styles: [
    `
      .league-item-card {
        cursor: pointer;
        margin: 0 1rem 1rem 1rem;
        height: 10rem;
      }
    `,
  ],
  imports: [NgIf, MatCardModule],
})
export class LeagueItemComponent {
  // The 'league' input from the parent component's loop.
  @Input() league!: League;
}
