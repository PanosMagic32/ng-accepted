import { Component } from '@angular/core';

import { ThemeToggleService } from '@shared/data-access/theme-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isThemeDark$ = this.themeToggleService.isThemeDark$;

  constructor(private themeToggleService: ThemeToggleService) {
    this.themeToggleService.loadTheme();
  }
}
