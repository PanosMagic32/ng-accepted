import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeToggleService {
  isThemeDark$ = new BehaviorSubject<boolean>(false);

  loadTheme() {
    const isThemeDark = localStorage.getItem('darkMode');
    this.isThemeDark$.next(isThemeDark ? true : false);
  }

  toggleTheme() {
    const isThemeDark = localStorage.getItem('darkMode');

    if (isThemeDark) {
      localStorage.removeItem('darkMode');
      this.isThemeDark$.next(false);
    } else {
      localStorage.setItem('darkMode', 'true');
      this.isThemeDark$.next(true);
    }
  }
}
