import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeToggleService {
  // Make 'isThemeDark' variable as a BehaviourSubject so that it can be accessed from several other locations as an Observable stream.
  isThemeDark$ = new BehaviorSubject<boolean>(false);

  /**
   * Load the theme from local storage, if it exists.
   */
  loadTheme() {
    const isThemeDark = localStorage.getItem('darkMode');
    this.isThemeDark$.next(isThemeDark ? true : false);
  }

  /**
   * Toggle the theme & update local storage.
   */
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
