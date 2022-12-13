import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { Sport } from '@shared/data-access/sport.interface';
import { DetailDialogComponent } from '@shared/detail-dialog/detail-dialog.component';

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
  @Input() sport!: Sport;

  private dialog = inject(MatDialog);

  async onSelect(sport: Sport) {
    this.dialog.open(DetailDialogComponent, {
      data: sport,
    });
  }
}
