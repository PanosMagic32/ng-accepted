import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeToggleService } from './shared/data-access/theme.service';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header></app-header>

    <div class="container mat-app-background" [ngClass]="{ darkMode: isThemeDark$ | async }">
      <section class="section left"></section>

      <section class="section main">
        <router-outlet></router-outlet>
      </section>

      <section class="section right"></section>
    </div>
  `,
  styles: [``],
  imports: [RouterModule, CommonModule, HeaderComponent],
})
export class AppComponent {
  themeToggleService = inject(ThemeToggleService);
  isThemeDark$ = this.themeToggleService.isThemeDark$;

  constructor() {
    this.themeToggleService.loadTheme();
  }
}
