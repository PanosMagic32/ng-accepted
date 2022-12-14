import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { DetailDialogComponent } from '@shared/detail-dialog/detail-dialog.component';
import { Sport } from '@sports/data-access/sport.interface';

@Component({
  selector: 'app-sport-item',
  standalone: true,
  template: `
    <ng-container *ngIf="sport">
      <mat-card class="sport-item-card" (click)="onSelect(sport)">
        <img mat-card-image [src]="sport.strSportThumb" [alt]="sport.strSport" />
        <mat-card-content>
          <p>{{ sport.strSport }}</p>

          <p class="line-clamp">{{ sport.strSportDescription }}</p>
        </mat-card-content>
      </mat-card>
    </ng-container>
  `,
  styles: [
    `
      .sport-item-card {
        cursor: pointer;
        margin: 0 1rem 1rem 1rem;
        height: 16rem;
      }

      .line-clamp {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `,
  ],
  imports: [NgIf, MatCardModule],
})
export class SportItemComponent {
  // The 'sport' input from the parent component's loop.
  @Input() sport!: Sport;

  // Inject the Material's Dialog & assign it to a variable.
  private dialog = inject(MatDialog);

  /**
   * The function to be called when a 'sport' card is selected.
   * @param sport The 'sport' model's data.
   */
  async onSelect(sport: Sport) {
    this.dialog.open(DetailDialogComponent, {
      data: sport,
    });
  }
}
