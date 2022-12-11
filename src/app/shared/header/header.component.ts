import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeToggleService } from '@shared/data-access/theme-toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="sticky-header">
      NG Accepted

      <span class="spacer"></span>

      Theme toggle:
      <button mat-icon-button (click)="toggleTheme()">
        <mat-icon *ngIf="isThemeDark$ | async">brightness_5</mat-icon>
        <mat-icon *ngIf="(isThemeDark$ | async) === false">bedtime</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }

      .sticky-header {
        position: fixed;
        top: 0;
        z-index: 1;
        height: 4rem;
      }
    `,
  ],
})
export class HeaderComponent {
  themeToggleService = inject(ThemeToggleService);
  isThemeDark$ = this.themeToggleService.isThemeDark$;

  toggleTheme() {
    this.themeToggleService.toggleTheme();
  }
}
