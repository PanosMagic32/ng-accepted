import { Route } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('@leagues/leagues.component').then((c) => c.LeaguesComponent) },
] as Route[];
