import { Route } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('@sports/sports.component').then((c) => c.SportsComponent) },
] as Route[];
