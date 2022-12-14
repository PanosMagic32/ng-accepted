import { OverlayContainer } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ThemeToggleService } from '@shared/data-access/theme.service';
import { Sport } from '@sports/data-access/sport.interface';

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
  // Inject the necessary services & assign them to variables.
  private overlay = inject(OverlayContainer);
  private themeToggleService = inject(ThemeToggleService);

  // Assign the 'isThemeDark' BehaviourSubject to a variable to use it for the dark theme class toggle.
  private isThemeDark$ = this.themeToggleService.isThemeDark$;

  // Inject the data from the Material Dialog display.
  data: Sport = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    // Handle the dark theme class according to the selected theme & apply it to the Material Dialog.
    this.isThemeDark$.pipe(first()).subscribe((isDark) => {
      if (isDark) {
        this.overlay.getContainerElement().classList.add('darkMode');
      } else {
        this.overlay.getContainerElement().classList.remove('darkMode');
      }
    });
  }
}
