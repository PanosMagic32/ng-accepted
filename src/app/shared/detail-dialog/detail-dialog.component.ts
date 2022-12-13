import { OverlayContainer } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Sport } from '@shared/data-access/sport.interface';
import { ThemeToggleService } from '@shared/data-access/theme.service';

@Component({
  selector: 'app-detail-dialog',
  standalone: true,
  template: `
    <div *ngIf="data" class="detail-dialog">
      <h1 mat-dialog-title>{{ data.strSport }}</h1>

      <div mat-dialog-content>
        <img [src]="data.strSportThumb" [alt]="data.strSport" />

        <p [innerText]="data.strSportDescription"></p>
      </div>
    </div>
  `,
  styles: [
    `
      .detail-dialog {
        max-width: 50vw;

        p {
          line-height: 1.2;
        }
      }
    `,
  ],
  imports: [NgIf, MatDialogModule],
})
export class DetailDialogComponent implements OnInit {
  private overlay = inject(OverlayContainer);
  private themeToggleService = inject(ThemeToggleService);
  private isThemeDark$ = this.themeToggleService.isThemeDark$;

  data: Sport = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    this.isThemeDark$.pipe(first()).subscribe((isDark) => {
      if (isDark) {
        this.overlay.getContainerElement().classList.add('darkMode');
      } else {
        this.overlay.getContainerElement().classList.remove('darkMode');
      }
    });
  }
}
